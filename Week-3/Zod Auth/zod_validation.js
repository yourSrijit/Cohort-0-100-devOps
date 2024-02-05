const zod=require("zod");
function vlaidateInput(arr){
    const schema =zod.array(zod.number());
    const response=schema.safeParse(arr);
    console.log(response);
}
vlaidateInput([1,2,3])