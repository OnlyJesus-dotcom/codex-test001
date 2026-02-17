'use client';
import { ChangeEvent } from 'react';
import { repo } from '@/db/indexedDb';
import { useAppStore } from '@/store/appStore';

export default function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const setSettings = useAppStore((s) => s.setSettings);
  const update = (key: keyof typeof settings) => setSettings({ ...settings, [key]: !settings[key] });

  const backup = async () => {
    const data = await repo.backup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bigsix-backup.json';
    a.click();
  };

  const restore = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    await repo.restore(JSON.parse(text));
    alert('복원 완료, 새로고침하세요.');
  };

  return (
    <main className="space-y-3">
      <section className="card space-y-2">
        {(['sound','voice','vibrate','wakeLock'] as const).map((k) => (
          <label key={k} className="flex gap-2"><input type="checkbox" checked={settings[k]} onChange={() => update(k)} />{k}</label>
        ))}
      </section>
      <section className="card">
        <h3 className="font-semibold">면책 고지</h3>
        <p>의학적 조언이 아니며, 통증 발생 시 즉시 중단하고 전문가와 상담하세요.</p>
        <label className="flex gap-2"><input type="checkbox" checked={settings.disclaimerAccepted} onChange={() => update('disclaimerAccepted')} />확인 및 동의</label>
      </section>
      <section className="card space-y-2">
        <button className="bg-slate-700" onClick={backup}>데이터 백업(JSON)</button>
        <input type="file" accept="application/json" onChange={restore} />
      </section>
    </main>
  );
}
