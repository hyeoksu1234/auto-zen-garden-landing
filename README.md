# Auto Zen Garden Landing

AI 반려돌과의 대화를 샌드 아트로 번역하는 전시형 인터랙션의 랜딩 페이지입니다.  
Next.js 15(App Router) + Tailwind 기반으로 구축했고, GitHub Pages에서 정적 호스팅할 수 있도록 최적화했습니다.

## 로컬 개발

```bash
npm install
npm run dev           # http://localhost:3004
```

주요 컴포넌트는 `src/app/page.tsx`와 `src/data/moodMeter.ts`에 있습니다.

## 프로덕션 빌드

```bash
npm run build
```

`next.config.ts`의 `output: "export"` 설정 덕분에 위 명령만 실행하면 최종 정적 산출물이 `out/` 폴더에 생성됩니다.  
`public/.nojekyll` 파일이 자동으로 복사되어 GitHub Pages에서도 `_next/*` 리소스가 차단되지 않습니다.

## GitHub Pages 배포

`npm run build:pages` 명령을 실행하면 `npm run build`와 동시에 `out/` 폴더 전체가 `docs/`로 복사되어 Pages 소스로 바로 사용할 수 있습니다.  

1. `npm run build` 실행 후 만들어진 `out/` 폴더를 Pages가 읽을 수 있는 위치로 업로드합니다.  
   - **Docs 폴더 방식**: `rm -rf docs && cp -R out docs` 후 `main` 브랜치 `docs/`를 Pages 소스로 지정합니다.  
   - **gh-pages 브랜치 방식**: `git worktree` 나 `peaceiris/actions-gh-pages` 등을 사용해 `out/` 내용을 `gh-pages` 브랜치에 커밋합니다.
2. GitHub Pages 설정에서 `https://hyeoksu1234.github.io/auto-zen-garden-landing/` 주소를 사용하세요.

### GitHub Actions 예시

```yaml
name: Deploy Pages
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> `next.config.ts`는 Vercel 환경 변수(`VERCEL`)가 감지되면 `basePath`를 비활성화합니다. GitHub Pages처럼 하위 경로에 배포할 때는 별도 환경 변수 설정 없이도 `/auto-zen-garden-landing` 경로를 자동으로 사용합니다.

## 다른 호스팅에 배포하고 싶다면?

`next.config.ts`의 `basePath`/`assetPrefix` 설정을 프로젝트 루트에 맞게 조정하거나, Vercel처럼 도메인 루트에 배포하는 경우 `VERCEL=1 npm run build` 형태로 환경 변수를 지정해 basePath를 비활성화하면 됩니다.
