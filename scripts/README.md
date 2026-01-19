# Scripts

이 폴더에는 프로젝트 자동화 스크립트들이 있습니다.

## 📝 generate-ai-manifest.js

AI 검색 기능을 위한 최적화된 manifest 파일을 생성합니다.

### 사용법

```bash
npm run generate:ai-manifest
```

### 동작 방식

1. `src/data/patterns/*.json` 파일들을 읽음 (117개)
2. AI 검색에 필요한 핵심 정보만 추출:
   - id, title, title_ko, category
   - description (200자 요약)
   - problem, solution, when_to_use
   - pros, cons, tags, related
3. 카테고리별로 정렬
4. `src/data/ai-manifest.json`에 저장

### 출력 정보

- 총 패턴 수
- 카테고리별 통계
- 파일 크기 (KB)
- 예상 토큰 수

### 언제 실행하나요?

- 새 패턴 추가 후
- 기존 패턴 수정 후
- AI 검색 기능 개발 전

### 예시 출력

```
✅ AI Manifest generated successfully!
   Output: src/data/ai-manifest.json
   Patterns: 117
   Categories: 8
   File size: 146.98 KB
   Est. tokens: ~37,626

📊 Patterns by category:
   Orchestration & Control: 33
   Tool Use & Environment: 21
   Context & Memory: 14
   ...
```

## 🔄 자동화 워크플로우 (향후)

추후 GitHub Actions에 통합 예정:

```yaml
- name: Generate AI Manifest
  run: npm run generate:ai-manifest

- name: Commit if changed
  run: |
    git add src/data/ai-manifest.json
    git commit -m "chore: Update AI manifest" || true
```
