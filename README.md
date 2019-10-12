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

`index.ts`

```typescript
import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
```

---

# Typescript

## TypeScript 설치하기

- npm
```
> npm install -g typescript
```

- yarn
```
> yarn global add typescript
```

<br/>

## TypeScript 파일 만들기
`index.ts`   
```typescript
const sayHi = (name) => {
  console.log(`Hello ${name}`);
};

sayHi('Alley');
```

<br/>

## Compiling
- index.ts -> index.js
```
> tsc index.ts
```

<br/>

## Type annotations
- sayHi의 인수에 string 타입을 명시 후, array로 매개변수와 함 함수 호출시 컴파일 에러.
```typescript
const sayHi = (name: string) => {
  console.log(`Hello ${name}`);
};

sayHi([1, 2, 3]);
```
```
Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
- 에러가 있었음에도 불구하고, index.js 파일은 생성되어 TypeScript를 사용할 수 있음.
  그러나 이 경우에 TypeScript는 코드가 예상대로 실행되지 않을 것이라고 경고.
  
<br/>

## Interfaces
```typescript
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "nicolas",
  age: 22,
  gender: "male"
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${
    person.gender
  }!`;
};

console.log(sayHi(person));
```

<br/>

## Classes
```typescript
class Human {
  public name: string;
  private age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const lynn = new Human("Lynn", 18, "female");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${
    person.gender
  }!`;
};

console.log(sayHi(lynn));
```

<br/>

## Interfaces + Classes
```typescript
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(greeter(user));
```