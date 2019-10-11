# Typechain

Learning Typescript by making a Blockchain with it

---

## start

`tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true
  },
  "include": [
    "index.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

- tsc : .ts 파일을 컴파일.
- package.json에 scripts 추가
```json
{
  "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  }
}
```