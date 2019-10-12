const name = "Alley",
  age = 24,
  gender = "female";

const sayHi = (name:string, age:number, gender:string): string => {
  return(`Hello ${name}, you are ${age}, you are a ${gender}!!!`);
};

console.log(sayHi(name, age, gender));

export {};