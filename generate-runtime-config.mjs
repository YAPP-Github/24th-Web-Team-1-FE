import fs from 'fs';
import path from 'path';

// 환경 변수를 읽어들임
const runtime = process.env.NODE_ENV === 'production' ? 'edge' : 'node';

const configContent = `export const runtime = '${runtime}';\n`;

const configDir = path.join(process.cwd(), 'src/config');
const configPath = path.join(configDir, 'runtime.js');

// 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// runtime.js 파일 생성
fs.writeFileSync(configPath, configContent, 'utf8');

console.log(`Runtime configuration written to ${configPath}`);


