/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const componentName = process.argv[2];

if (!componentName) {
  console.error('컴포넌트 이름을 입력해주세요.');
  process.exit(1);
}

try {
  execSync(`pnpm dlx shadcn-ui@latest add ${componentName}`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.error(`컴포넌트 생성 중 오류가 발생했습니다: ${error}`);
  process.exit(1);
}
