# 2048 게임

이미지를 참고하여 만든 2048 게임입니다!

## 게임 규칙

- **목표**: 같은 숫자를 합쳐서 2048 타일을 만들기
- **조작**:
  - 키보드: 화살표 키 (↑ ↓ ← →) 사용
  - 모바일: 손가락으로 스와이프하여 이동
- **점수**: 타일을 합칠 때마다 합쳐진 타일의 값만큼 점수 획득
- **게임 오버**: 더 이상 이동할 수 없을 때 게임 종료

## 기능

✅ 4x4 그리드 게임판
✅ 타일 자동 조합
✅ 점수 시스템 (현재 점수 + 최고 점수)
✅ 2048 달성 시 축하 메시지
✅ 게임 오버 감지
✅ 새 게임 시작 버튼
✅ 모바일 터치 지원
✅ LocalStorage에 최고 점수 저장
✅ **🏆 랭킹 시스템**: 최고 기록 10개 저장 및 표시

## 파일 구조

```
게임 파일/
├── index.html    # HTML 구조 (SEO 메타 태그 포함)
├── style.css     # 스타일링 (반응형 디자인)
├── game.js       # 게임 로직
├── robots.txt    # 검색 엔진 크롤러 설정
├── sitemap.xml   # 사이트맵
└── README.md     # 설명서 (현재 파일)
```

## 실행 방법

1. `index.html` 파일을 브라우저에서 열기
2. 화살표 키로 게임 시작
3. 타일을 합쳐서 2048을 만들어보세요!

## 게임 화면

- 타일 색상: 숫자가 커질수록 더 밝은 노란색으로 변함
- 2048 달성 시: 특별한 빛 효과 표시
- 반응형 디자인: 데스크톱, 태블릿, 모바일 모두 지원

---

## Google 검색 결과에 나타나는 방법

이 게임을 Google 검색 결과에 나타나게 하려면 다음 단계를 따르세요:

### 1️⃣ 웹사이트 호스팅하기 (필수)

현재 파일은 로컬 컴퓨터에만 있습니다. 인터넷에 공개해야 합니다.

**추천 호스팅 서비스:**
- **GitHub Pages** (무료) - https://pages.github.com/
- **Netlify** (무료) - https://www.netlify.com/
- **Vercel** (무료) - https://vercel.com/
- **Firebase Hosting** (무료) - https://firebase.google.com/

### 2️⃣ Google Search Console에 등록하기

1. https://search.google.com/search-console 접속
2. "속성 추가" 클릭
3. 웹사이트 URL 입력
4. 소유권 확인 (도메인 또는 HTML 파일 업로드)
5. Sitemap 제출: `sitemap.xml`

### 3️⃣ robots.txt 및 Sitemap 설정

- `robots.txt`: 검색 엔진 크롤러 설정 ✅ (이미 생성됨)
- `sitemap.xml`: 사이트 구조 지도 ✅ (이미 생성됨)
- **주의**: `yourdomain.com`을 실제 도메인으로 변경하세요

### 4️⃣ 도메인 준비 (선택사항)

- 별도 도메인 구매: https://www.namecheap.com/, https://www.godaddy.com/ 등
- 또는 무료 서브도메인 사용 (예: `username.github.io`)

### 5️⃣ SEO 최적화

✅ 메타 태그 추가됨:
- `title`: 페이지 제목
- `description`: 페이지 설명
- `keywords`: 검색 키워드
- Open Graph 태그: 소셜 미디어 공유 최적화
- Twitter Card: 트위터 공유 최적화

### 예상 검색 결과

호스팅 후 Google Search Console에 등록하면, 약 **1-2주일** 후에 다음 검색어로 나타날 수 있습니다:

- "2048 게임"
- "무료 온라인 게임"
- "숫자 퍼즐 게임"
- "2048 온라인"

---

## GitHub Pages로 간단하게 배포하기

1. GitHub 계정 만들기: https://github.com/
2. 새 저장소 만들기 (이름: `username.github.io`)
3. 모든 파일 업로드
4. 자동으로 `https://username.github.io`에서 접속 가능
5. Google Search Console에 등록

---

즐겁게 플레이하세요! 🎮
