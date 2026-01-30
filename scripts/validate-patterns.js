#!/usr/bin/env node
/**
 * Pattern JSON Validator
 * 패턴 JSON 파일들의 유효성을 검증합니다.
 *
 * Usage:
 *   node scripts/validate-patterns.js
 *   node scripts/validate-patterns.js --verbose
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATTERNS_DIR = path.join(__dirname, '../src/data/patterns');

// 필수 필드
const REQUIRED_FIELDS = ['id', 'title', 'title_ko', 'category', 'status'];

// 유효한 카테고리
const VALID_CATEGORIES = [
  'Orchestration & Control',
  'Context & Memory',
  'Feedback Loops',
  'Learning & Adaptation',
  'Reliability & Eval',
  'Security & Safety',
  'Tool Use & Environment',
  'UX & Collaboration',
  'Uncategorized'
];

// 유효한 상태
const VALID_STATUSES = [
  'best-practice',
  'validated-in-production',
  'established',
  'emerging',
  'proposed',
  'experimental-but-awesome',
  'rapidly-improving'
];

// 다국어 필드 (객체 형태여야 함)
const BILINGUAL_FIELDS = ['problem', 'solution', 'when_to_use', 'pros', 'cons'];

const verbose = process.argv.includes('--verbose');

// README 파일 경로
const README_FILES = [
  path.join(__dirname, '../README.md'),
  path.join(__dirname, '../README_KR.md')
];

function log(msg) {
  if (verbose) console.log(msg);
}

function validatePattern(filePath) {
  const errors = [];
  const warnings = [];
  const fileName = path.basename(filePath);

  // 1. JSON 파싱
  let pattern;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    pattern = JSON.parse(content);
  } catch (e) {
    errors.push(`JSON 파싱 실패: ${e.message}`);
    return { fileName, errors, warnings };
  }

  // 2. 필수 필드 확인
  for (const field of REQUIRED_FIELDS) {
    if (!pattern[field]) {
      errors.push(`필수 필드 누락: ${field}`);
    }
  }

  // 3. ID와 파일명 일치 확인
  const expectedId = fileName.replace('.json', '');
  if (pattern.id !== expectedId) {
    errors.push(`ID 불일치: 파일명=${expectedId}, id=${pattern.id}`);
  }

  // 4. 카테고리 유효성
  if (pattern.category && !VALID_CATEGORIES.includes(pattern.category)) {
    errors.push(`유효하지 않은 카테고리: ${pattern.category}`);
  }

  // 5. 상태 유효성
  if (pattern.status && !VALID_STATUSES.includes(pattern.status)) {
    errors.push(`유효하지 않은 상태: ${pattern.status}`);
  }

  // 6. 다국어 필드 형식 확인
  for (const field of BILINGUAL_FIELDS) {
    if (pattern[field]) {
      if (typeof pattern[field] !== 'object') {
        warnings.push(`${field}는 객체(en/ko) 형태 권장`);
      } else {
        if (!pattern[field].en) {
          warnings.push(`${field}.en 누락`);
        }
        if (!pattern[field].ko) {
          warnings.push(`${field}.ko 누락`);
        }
      }
    }
  }

  // 7. tags가 배열인지 확인
  if (pattern.tags && !Array.isArray(pattern.tags)) {
    errors.push(`tags는 배열이어야 함`);
  }

  // 8. title_ko가 있는지 확인
  if (pattern.title && !pattern.title_ko) {
    warnings.push(`title_ko 누락 (한국어 제목)`);
  }

  return { fileName, errors, warnings, pattern };
}

function validateReadmeCounts(actualTotal, actualCategoryCounts) {
  const errors = [];

  for (const readmePath of README_FILES) {
    if (!fs.existsSync(readmePath)) continue;

    const fileName = path.basename(readmePath);
    const content = fs.readFileSync(readmePath, 'utf-8');

    // 1. 전체 패턴 수 검증 (예: "129 patterns", "129개 패턴")
    const totalPatterns = content.match(/\*\*(\d+)(?:개)?\s*patterns?\*\*|\*\*(\d+)개\s*패턴\*\*/gi);
    if (totalPatterns) {
      for (const match of totalPatterns) {
        const num = parseInt(match.match(/\d+/)[0]);
        if (num !== actualTotal) {
          errors.push(`${fileName}: 전체 패턴 수 불일치 - 문서="${num}", 실제=${actualTotal}`);
        }
      }
    }

    // 2. 카테고리별 패턴 수 검증 (예: "(37)", "(37개)")
    for (const [category, count] of Object.entries(actualCategoryCounts)) {
      // 카테고리 이름과 숫자를 함께 찾기
      const categoryRegex = new RegExp(
        category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\**\\s*\\((\\d+)개?\\)',
        'i'
      );
      const match = content.match(categoryRegex);
      if (match) {
        const docCount = parseInt(match[1]);
        if (docCount !== count) {
          errors.push(`${fileName}: ${category} 수 불일치 - 문서="${docCount}", 실제=${count}`);
        }
      }
    }

    // 3. "X개 주요 카테고리, Y개 패턴" 형식 검증
    const summaryMatch = content.match(/(\d+)개\s*(?:주요\s*)?카테고리[,\s]+(\d+)개\s*패턴/);
    if (summaryMatch) {
      const docPatternCount = parseInt(summaryMatch[2]);
      if (docPatternCount !== actualTotal) {
        errors.push(`${fileName}: 요약 패턴 수 불일치 - 문서="${docPatternCount}", 실제=${actualTotal}`);
      }
    }
  }

  return errors;
}

function main() {
  console.log('🔍 패턴 JSON 검증 시작...\n');

  // 패턴 파일 목록
  const files = fs.readdirSync(PATTERNS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(PATTERNS_DIR, f));

  console.log(`📁 총 ${files.length}개 패턴 파일 발견\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  const categoryCount = {};
  const statusCount = {};

  for (const file of files) {
    const result = validatePattern(file);

    // 카테고리별 집계
    if (result.pattern?.category) {
      categoryCount[result.pattern.category] = (categoryCount[result.pattern.category] || 0) + 1;
    }

    // 상태별 집계
    if (result.pattern?.status) {
      statusCount[result.pattern.status] = (statusCount[result.pattern.status] || 0) + 1;
    }

    if (result.errors.length > 0) {
      console.log(`❌ ${result.fileName}`);
      result.errors.forEach(e => console.log(`   ERROR: ${e}`));
      totalErrors += result.errors.length;
    }

    if (result.warnings.length > 0) {
      if (result.errors.length === 0) {
        log(`⚠️  ${result.fileName}`);
      }
      result.warnings.forEach(w => log(`   WARNING: ${w}`));
      totalWarnings += result.warnings.length;
    }

    if (result.errors.length === 0 && result.warnings.length === 0) {
      log(`✅ ${result.fileName}`);
    }
  }

  // 요약
  console.log('\n' + '='.repeat(50));
  console.log('📊 검증 결과 요약');
  console.log('='.repeat(50));
  console.log(`총 패턴 수: ${files.length}`);
  console.log(`에러: ${totalErrors}개`);
  console.log(`경고: ${totalWarnings}개`);

  console.log('\n📂 카테고리별 분포:');
  for (const [cat, count] of Object.entries(categoryCount).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }

  console.log('\n📈 상태별 분포:');
  for (const [status, count] of Object.entries(statusCount).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${status}: ${count}`);
  }

  // README 문서 검증
  console.log('\n📄 README 문서 검증:');
  const readmeErrors = validateReadmeCounts(files.length, categoryCount);
  if (readmeErrors.length > 0) {
    for (const err of readmeErrors) {
      console.log(`   ❌ ${err}`);
    }
    totalErrors += readmeErrors.length;
  } else {
    console.log('   ✅ 문서와 실제 패턴 수 일치');
  }

  console.log('\n' + '='.repeat(50));

  if (totalErrors > 0) {
    console.log('❌ 검증 실패: 에러를 수정해주세요.');
    process.exit(1);
  } else {
    console.log('✅ 검증 성공!');
    process.exit(0);
  }
}

main();
