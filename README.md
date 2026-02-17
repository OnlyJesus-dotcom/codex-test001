# Big Six Structure Trainer (PWA)

저작권 안전한 구조 기반(카테고리/단계/세트·반복·휴식) 운동 타이머 & 루틴 기록 앱입니다.

## 핵심 원칙
- 책 원문/문구/표를 복제하지 않습니다.
- 단계명은 기본 `Step 1 ~ Step 10` 일반 표현만 제공합니다.
- 의학적 조언이 아니며, 통증 시 즉시 중단 후 전문가 상담이 필요합니다.

## 실행
```bash
npm install
npm run dev
```

## 테스트
```bash
npm test
npx playwright test
```

## 사용 흐름
1. **루틴 만들기/복제**: Routines에서 예시 템플릿 복제 또는 새 루틴 생성
2. **운동 시작**: Home에서 빠른 시작 또는 세션 선택 후 Workout Player 진입
3. **세트 진행**: reps 입력 → 완료 → 휴식 타이머 자동 시작 (+10/+30초 가능)
4. **기록 확인**: History에서 날짜별 로그 확인
5. **설정**: 소리/음성/진동/화면유지 토글, 백업/복원(JSON), 면책 고지 동의

## 배포(Vercel)
- GitHub에 푸시 후 Vercel에서 Import Project
- Build: `npm run build`, Output: Next.js 기본값

