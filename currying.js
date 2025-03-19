

/*
infinite currying
*/
function curry(a) {
  return function (b) {
    if (b) return curry(a + b);

    return a;
  };
}


const reuslt=curry(2)(3)(4)()
// console.log("result",reuslt)

/*
convert func(a,b,c)=>func(a)(b)(c)
*/

function convertToCurry(func){

    // console.log("funclengh",func.length,)

    return  function curriedFunc(...args){
        if(args.length>=func.length){
            console.log("got all arhuments")
            return func(...args)
        }else{

            return function(...next){
                    return curriedFunc(...args,...next)
            }
            console.log("add more args")
        }
    }

}

const sum=(a,b,c)=>{

return a+b+c

}


const newFunction=convertToCurry(sum)
console.log("newFunction",newFunction(2)(3)(5))