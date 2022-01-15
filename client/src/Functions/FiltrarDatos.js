import { useState } from "react";

  function InputFilterValue(){

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
      }

      }
      return [sugerencias,FunctionFilter];
  }

  export default InputFilterValue;