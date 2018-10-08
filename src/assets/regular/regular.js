/**********************整数或整数带两位小数*********************/
const threeDecimalPlaces = (rule, value, callback) => {
  if(value) {
    if (/^\d{1,10}(?:\.\d{1,2})?$/.test(value)) {
      callback();
    } else {
      return callback(new Error('最多输入10位整数小数保留到2位'));
    }
  }
};

/*******************邮编*********************/
const postCode =(rule, value, callback)=>{
  if(value) {
    if (/^\d{6}$/.test(value)) {
      callback();
    } else {
      return callback(new Error('邮编由六位数字组成'));
    }
  }else{
    return callback();
  }


};

/****************number:number*****************/
const numberThanNumber =(rule, value, callback)=>{

  if(value){
    if( /^\d{1,10}(?:\.\d{1,2})?(\:)\d{1,10}(?:\.\d{1,2})?$/.test(value) ){
      callback();
    }else{
      return callback(new Error('“例如5:3”整数最多10位小数保留2位 '));
    }
  }
};

/*****************判断整数15位*******************/
const number =(rule, value, callback)=>{
  if(value){
    if( /^\d{1,15}$/.test(value)  ){
      callback();
    }else{
      return callback(new Error('最多15位数字'));
    }
}
};
/*****************判断整数6位*******************/
const numberSix =(rule, value, callback)=>{
  if( /^\d{1,6}$/.test(value) ){
    callback();
  }else{
    return callback(new Error('最多6位数字'));
  }
};

/**************座机电话******************/
const phoneNumber =(rule, value, callback)=>{
  if(value) {
    if (/^\d{3,4}\-\d{7,8}$/.test(value)) {
      callback();
    } else {
      return callback(new Error("'例如：010-88888888'"));
    }
  }
};
/***************中文或字母*******************/
const chineseOrAlphabet =(rule, value, callback)=>{
  if( /[^\a-\z\A-\Z\u4E00-\u9FA5]$/.test(value) ){
    callback();
  }else{
    return callback(new Error("请输入中文,字母和数字"));
  }
};

export default {
  threeDecimalPlaces,
  postCode,
  numberThanNumber,
  number,
  numberSix,
  phoneNumber,
  chineseOrAlphabet,
}
