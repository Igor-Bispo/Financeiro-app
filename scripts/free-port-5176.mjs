#!/usr/bin/env node
import os from 'node:os';
import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execCb);
const PORT = 5176;

function log(msg) {
  console.log(`[predev] ${msg}`);
}

async function killOnWindows() {
  try {
    const { stdout } = await exec(`netstat -ano -p tcp | findstr :${PORT}`);
    const lines = stdout.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const pids = new Set();
    for (const line of lines) {
      const parts = line.split(/\s+/).filter(Boolean);
      const hasListening = parts.some(p => p.toUpperCase() === 'LISTENING');
      const pid = parts[parts.length - 1];
      if (hasListening && pid && /^\d+$/.test(pid)) {
        pids.add(pid);
      }
    }
    if (pids.size === 0) {
      log(`Nenhum processo escutando a porta ${PORT}.`);
      return;
    }
    for (const pid of pids) {
      let procInfo = null;
      try {
        const { stdout: pjson } = await exec(
          `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"ProcessId=${pid}\" | Select-Object ProcessId,Name,CommandLine | ConvertTo-Json -Compress"`
        );
        procInfo = JSON.parse(pjson);
      } catch {}
      const label = procInfo
        ? `${procInfo.Name || 'processo'} (PID ${pid})` + (procInfo.CommandLine ? ` cmd: ${procInfo.CommandLine.substring(0, 140)}...` : '')
        : `PID ${pid}`;
      try {
        await exec(`taskkill /PID ${pid} /F`);
        log(`Processo ${label} finalizado na porta ${PORT}.`);
      } catch (e) {
        const err = `${e?.stderr || e?.message || ''}`.trim();
        if (/Acesso negado|Access is denied/i.test(err)) {
          log(`Acesso negado ao finalizar ${label}. Dica: feche o app que usa a porta ${PORT} ou abra o terminal como Administrador e finalize o processo.`);
        } else {
          log(`Falha ao finalizar ${label}: ${err || 'motivo desconhecido'}`);
        }
      }
    }
  } catch (e) {
    log(`Nenhum processo encontrado na ${PORT} ou erro ao consultar: ${e?.stderr || e?.message}`);
  }
}

async function killOnPosix() {
  try {
    const { stdout } = await exec(`lsof -ti tcp:${PORT}`);
    const pids = stdout.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (pids.length === 0) {
      log(`Nenhum processo escutando a porta ${PORT}.`);
      return;
    }
    for (const pid of pids) {
      try {
        await exec(`kill -9 ${pid}`);
        log(`Processo ${pid} finalizado na porta ${PORT}.`);
      } catch (e) {
        log(`Falha ao finalizar PID ${pid}: ${e?.stderr || e?.message}`);
      }
    }
  } catch (e) {
    try {
      await exec(`fuser -k ${PORT}/tcp`);
      log(`Processos finalizados via fuser na porta ${PORT}.`);
    } catch (e2) {
      log(`Falha ao liberar porta ${PORT} com lsof/fuser: ${e2?.stderr || e2?.message}`);
    }
  }
}

(async () => {
  const platform = os.platform();
  if (platform === 'win32') {
    await killOnWindows();
  } else {
    await killOnPosix();
  }
})();