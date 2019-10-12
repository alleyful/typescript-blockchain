# Typechain

Learning Typescript by making a Blockchain with it

---

## Setting

`tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": [
    "src/**/*"
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

- tsc-watch 추가
```json
{
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\" "
  },
  "devDependencies": {
    "tsc-watch": "^4.0.0"
  }
}
```

<br/>

## 