# Awesome Agentic Patterns (한국어)

![Awesome Agentic Patterns](/agentic-patterns.jpeg)

[nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)의 한국어 번역 및 시각화 웹사이트입니다. 실전 프로덕션 환경에서 자율적 또는 반자율적 AI 에이전트가 유용한 작업을 수행하도록 돕는 **에이전트 AI 패턴** 카탈로그를 제공합니다.

> **왜 만들었나요?**
> 튜토리얼은 장난감 데모만 보여주고, 실제 제품은 복잡한 부분을 숨깁니다. 이 사이트는 그 간극을 메우는 반복 가능한 패턴을 한국어로 제공하여, 우리 모두가 더 스마트하고 빠른 에이전트를 만들 수 있도록 합니다.

🌐 **웹사이트**: [https://gorita.github.io/awesome-agentic-patterns](https://gorita.github.io/awesome-agentic-patterns) (예정)

---

## ✨ 특징

- 🇰🇷 **한국어/영어 지원**: 모든 패턴을 한국어와 영어로 제공
- 📱 **반응형 디자인**: 데스크톱과 모바일 모두 최적화
- 🎨 **모던 UI**: Astro + Tailwind CSS 기반의 깔끔한 인터페이스
- 📂 **카테고리별 정리**: 8개 주요 카테고리로 분류된 117개 패턴
- 🗂️ **사이드바 네비게이션**: 데스크톱 고정 사이드바, 모바일 햄버거 메뉴
- 🔍 **검색 기능**: 원하는 패턴을 빠르게 찾기 (구현 예정)
- 📊 **상세 모달**: 문제, 해결책, 다이어그램, 코드 예제, 장단점 등
- 🎯 **개별 파일 관리**: 117개 패턴을 개별 JSON 파일로 관리 (토큰 효율성)
- 🔄 **자동 동기화**: GitHub Actions를 통한 원본 저장소 업데이트 감지 (예정)

---

## 📂 카테고리

| 카테고리 | 설명 | 패턴 수 |
|---------|------|--------|
| 🎛️ **Orchestration & Control** | 태스크 분해, 서브 에이전트 생성, 도구 라우팅 | 31개 |
| 🧠 **Context & Memory** | 슬라이딩 윈도우, 벡터 캐시, 에피소딕 메모리 | 13개 |
| 🔄 **Feedback Loops** | 컴파일러, CI, 휴먼 리뷰, 자가 치유 재시도 | 13개 |
| 📚 **Learning & Adaptation** | 에이전트 RFT, 스킬 라이브러리, 분산 기반 RL | 5개 |
| ✅ **Reliability & Eval** | 가드레일, 평가 프레임워크, 로깅, 재현성 | 13개 |
| 🔒 **Security & Safety** | 격리된 VM, PII 토큰화, 보안 스캐닝 | 3개 |
| 🔧 **Tool Use & Environment** | 셸, 브라우저, DB, Playwright, 샌드박스 트릭 | 26개 |
| 👥 **UX & Collaboration** | 프롬프트 핸드오프, 단계별 커밋, 비동기 백그라운드 에이전트 | 13개 |

---

## 🛠️ 기술 스택

- **프레임워크**: [Astro](https://astro.build/) - 정적 사이트 생성
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS
- **다이어그램**: [Mermaid.js](https://mermaid.js.org/) - 플로우차트 및 다이어그램
- **언어**: TypeScript
- **배포**: GitHub Pages
- **검색**: Pagefind (예정) - 빌드타임 인덱싱

---

## 🚀 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Git

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/gorita/awesome-agentic-patterns.git
cd awesome-agentic-patterns

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:4321

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
awesome-agentic-patterns/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages 자동 배포
│       └── check-upstream.yml  # 원본 업데이트 알림 (예정)
├── src/
│   ├── components/
│   │   ├── PatternCard.astro      # 패턴 카드 (요약)
│   │   ├── PatternModal.astro     # 패턴 상세 모달
│   │   ├── SearchBar.astro        # 검색 바
│   │   └── LanguageToggle.astro   # 언어 토글
│   ├── data/
│   │   └── patterns/              # 117개의 개별 패턴 JSON 파일
│   │       ├── plan-then-execute-pattern.json
│   │       ├── reflection.json
│   │       └── ... (각 약 5KB)
│   ├── layouts/
│   │   └── MainLayout.astro       # 메인 레이아웃
│   ├── pages/
│   │   └── index.astro            # 메인 페이지
│   └── styles/
│       └── global.css             # 글로벌 스타일
├── public/
│   └── favicon.svg
├── patterns/                      # upstream 원본 마크다운 (참조용)
│   └── *.md
├── scripts/
│   └── sync-upstream.sh           # upstream 동기화 스크립트 (예정)
├── astro.config.mjs
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 📊 데이터 구조 (개별 파일 방식)

### 왜 개별 파일로 관리하나요?

| 상황 | 장점 |
|------|------|
| 새 패턴 추가 | 새 파일 1개만 생성 (토큰 절약) |
| 기존 패턴 수정 | 해당 파일만 읽고 수정 |
| Git 관리 | 변경된 파일만 diff에 표시 |
| Claude Code 효율 | 필요한 파일만 컨텍스트에 로드 |

### 패턴 JSON 구조

각 패턴은 `src/data/patterns/{id}.json` 형식으로 저장됩니다:

```json
{
  "id": "context-minimization-pattern",
  "title": "Context-Minimization Pattern",
  "title_ko": "컨텍스트 최소화 패턴",
  "category": "Context & Memory",
  "status": "best-practice",
  "original_url": "https://agentic-patterns.com/patterns/context-minimization-pattern/",
  "problem": {
    "en": "User-supplied text lingers in context...",
    "ko": "사용자 입력 텍스트가 컨텍스트에 남아있으면..."
  },
  "solution": {
    "en": "Purge untrusted segments after transforming...",
    "ko": "안전한 중간 형태로 변환 후 신뢰할 수 없는 세그먼트 제거..."
  },
  "when_to_use": {
    "en": ["Customer service chat", "Medical Q&A"],
    "ko": ["고객 서비스 챗봇", "의료 Q&A 시스템"]
  },
  "pros": {
    "en": ["Simple", "Prevents injection"],
    "ko": ["간단함", "인젝션 방지"]
  },
  "cons": {
    "en": ["Loses conversational nuance"],
    "ko": ["대화의 뉘앙스 손실"]
  },
  "ascii_diagram": "User Input ──▶ [Transform] ──▶ Safe Output",
  "mermaid_diagram": "flowchart LR\nA[User Input] --> B[Transform]",
  "code_example": "sql = LLM(\"to SQL\", user_prompt)\nremove(user_prompt)",
  "tags": ["security", "context", "injection-prevention"]
}
```

---

## 🔄 워크플로우

### Phase 1: 초기 세팅 (완료)

```
✅ 프로젝트 초기화 (Astro + Tailwind CSS)
✅ 원본 repo fork & clone
✅ 웹사이트 템플릿 구축 (사이드바 + 모달)
✅ 모든 패턴 AI 처리 (117개 번역 + 시각화)
✅ 첫 배포 테스트
⬜ GitHub Actions 설정 (예정)
```

### Phase 2: 업데이트 (자동화 예정)

```
[GitHub Actions: upstream 변경 감지]
    │
    ▼
[알림 받음]
    │
    ▼
[Claude Code 실행]
    │
    ├── upstream 동기화
    ├── 새 패턴 AI 처리
    └── git push
          │
          ▼
[GitHub Actions: 자동 배포]
```

---

## 🎯 새로운 패턴 추가하기

### 1. JSON 파일 생성

`src/data/patterns/new-pattern-id.json`:

```json
{
  "id": "new-pattern-id",
  "title": "New Pattern",
  "title_ko": "새로운 패턴",
  "category": "Orchestration & Control",
  "status": "emerging",
  "problem": {
    "en": "Problem description...",
    "ko": "문제 설명..."
  },
  "solution": {
    "en": "Solution description...",
    "ko": "해결책 설명..."
  },
  "tags": ["tag1", "tag2"]
}
```

### 2. 빌드 및 테스트

```bash
npm run build
npm run preview
```

### 3. 커밋 및 배포

```bash
git add src/data/patterns/new-pattern-id.json
git commit -m "feat: Add new pattern"
git push
```

---

## 🤝 기여하기

패턴 추가, 번역 개선, 버그 수정 등 모든 기여를 환영합니다!

### 기여 가이드라인

1. 이 저장소를 Fork
2. 새로운 브랜치 생성 (`git checkout -b feature/new-pattern`)
3. 변경사항 커밋 (`git commit -m 'feat: Add new pattern'`)
4. 브랜치에 Push (`git push origin feature/new-pattern`)
5. Pull Request 생성

### 커밋 메시지 규칙

- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `chore`: 빌드 설정, 패키지 등

---

## 🔮 향후 계획

- [ ] AI 시맨틱 검색 (Anthropic API 클라이언트 사이드)
- [ ] 다크모드 지원
- [ ] 패턴 간 관계 그래프 시각화
- [ ] 즐겨찾기 기능 (localStorage)
- [ ] PDF 내보내기
- [ ] GitHub Actions로 upstream 자동 동기화
- [ ] Pagefind 검색 통합

---

## 📜 원본 프로젝트

이 프로젝트는 [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)를 기반으로 합니다.

원본 프로젝트는 MkDocs 기반이며, 이 버전은:
- Astro로 재구현
- 한국어 번역 추가 (AI 번역)
- 시각화 개선 (다이어그램, 모달)
- 개별 JSON 파일로 데이터 관리 (토큰 효율성)

---

## 📄 라이선스

Apache-2.0 License - [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns)와 동일

---

## 🙏 감사의 말

- **nibzard** - 원본 프로젝트 큐레이션 및 패턴 정리
- **원본 기여자들** - 모든 패턴 작성자 및 기여자
- **Astro 팀** - 뛰어난 정적 사이트 생성기
- **Anthropic** - Claude를 통한 번역 및 AI 지원

---

## 📧 연락처

질문이나 제안사항이 있으시면 [Issues](https://github.com/gorita/awesome-agentic-patterns/issues)에 등록해주세요.

---

## ⭐ Star History

이 프로젝트가 유용하다면 Star를 눌러주세요!

[![Star History Chart](https://api.star-history.com/svg?repos=gorita/awesome-agentic-patterns&type=date)](https://star-history.com/#gorita/awesome-agentic-patterns&Date)
