import { useState } from "react";

  function InputFilterValue(){


      /* I receive as a parameter the text that is written in the input and the complete data,
       I filter all the data with its concept property. and return only the data that matches the regular expression.* */


      const [sugerencias,SetSugerencias] = useState([]);

      function FunctionFilter(text,data){
      let matches = [];
      if(text.length > 0){
      matches = data.filter((gasto)=>{
      const regex = new RegExp(`${text}`,"gi");
      return gasto.Concepto.match(regex)
      });
      SetSugerencias(matches);
      }else{
      SetSugerencias(data);
      }}
      
      return [sugerencias,FunctionFilter];
  }

  export default InputFilterValue;