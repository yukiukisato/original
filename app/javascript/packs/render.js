// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.




console.log("実行テスト")
// 運動時間を計算するクラス
class Culc{
  constructor(kcal,METs,Weight){
    // 消費カロリー(kcal) ＝ 1.05 * METs * 体重(kg) * 運動時間(h)
    var kcalObj = document.getElementById(kcal);
    var METsObj = document.getElementById(METs);
    var WeightObj = document.getElementById(Weight);
    this.kcal = kcalObj.value;
    this.METs = METsObj.value;
    this.Weight = WeightObj.value;
    this.coefficient = 1.05;
  }
  
  culcWorkoutTime(){
    // 運動時間(h) ＝ 消費カロリー(kcal) / (1.05 * METs * 体重(kg) )
    var workouttime = this.kcal / (this.coefficient * this.METs * this.Weight);
    console.log("運動時間:",workouttime);
    return (workouttime);
  }

  // outputByHourMinute(){
  //   //運動時間を算出後、表示用の時分秒に整形する
  //   var Time = Number(this.culcWorkoutTime().toFixed(2));
  //   var Hour = Math.floor(Time);
  //   var Min = Math.floor((Time-Hour)*60);
  //   return Hour + "時間" + Min + "分";
  // }

}

function showResultWorkoutTimeTo(ElementID){
  //DOMから表示用のHTMLタグIDでオブジェクトを取得
  var elementForShow = document.getElementById(ElementID);
  var result = new Culc("kcal","METs","Weight");
  var time = new TimeConvert(result.culcWorkoutTime(),0,0);
  time.fixTime();

  //いったんリフレッシュ
	elementForShow.innerHTML = "";
  elementForShow.innerHTML = time.hour + "時間" + time.min + "分" + time.sec + "秒";

}


  function readFirst(){
    //セレクトボックスの選択肢を読み込む
    cleateSelectbox("METs");
  }



function cleateSelectbox(METs){
	/**
	* listオブジェクトからを作成する
	* @returns {null} 返り値なし
	*/
  //連想配列をループ処理で値を取り出してセレクトボックスにセットする
  var Selectbox = new SelectboxList();
  let opt = document.createElement("option");
  let tmp = document.getElementById(METs);
  for(var i=0;i<Selectbox.list.length;i++){
    opt = document.createElement("option");
    opt.value = Selectbox.list[i].val;  //value値
    opt.text = Selectbox.list[i].txt;   //テキスト値
    tmp.appendChild(opt);
  }
}



class SelectboxList{	
  constructor(){
    this.list = [
      // {val:",,",txt:""},
      {val:"0.9",txt:" 0.9 [睡眠]"},
      {val:"1.0",txt:" 1.0 [椅子に座る]"},
      {val:"1.5",txt:" 1.5 [入浴]"},
      {val:"2.0",txt:" 2.0 [会話を伴った食事]"},
      {val:"2.5",txt:" 2.5 [ストレッチ,ハタヨガ]"},
      {val:"3.0",txt:" 3.0 [洗車,散歩(3km/h以下),筋トレ(軽度)]"},
      {val:"3.5",txt:" 3.5 [モップがけ,アーチェリー,柔軟体操]"},
      {val:"4.0",txt:" 4.0 [徒歩(4km/h),自転車(16km/h),乗馬]"},
      {val:"4.5",txt:" 4.5 [ゴルフ,バトミントン,フラダンス]"},
      {val:"5.0",txt:" 5.0 [エアロビ(軽度),ソフトボール,野球]"},
      {val:"5.5",txt:" 5.5 [エアロバイク(100ワット)]"},
      {val:"6.0",txt:" 6.0 [水泳(背泳ぎ),ジョギング,自転車(19km/h),筋トレ(強度)]"},
      {val:"6.5",txt:" 6.5 [エアロビ(強度)]"},
      {val:"7.0",txt:" 7.0 [登山(軽量の荷物),テニス,サッカー,スキー,エアロバイク(150ワット)]"},
      {val:"8.0",txt:" 8.0 [ランニング(8km/h),自転車(22km/h),水泳(クロール),腕立て伏せ,懸垂,腹筋運動]"},
      {val:"10.0",txt:"10.0 [ランニング(10km/h),柔道,空手,水泳(平泳ぎ)]"},
      {val:"11.0",txt:"11.0 [水泳(バタフライ)]"},
      {val:"15.0",txt:"15.0 [ランニング(14.5km/h)]"},
    ];
  }
}



class TimeConvert{
  constructor(hour,min,sec){
    this.hour = hour;
    this.min = min;
    this.sec = sec;
  }

  fixTime(){
    //一時保管用の秒数に変換後、時→分→秒の順に整形する。

    var tmpHour = this.hour;
    var tmpMin = this.min;
    var tmpSec = this.sec;

    //秒数に変換
    var tmpTime = this.conv2sec(tmpHour,tmpMin,tmpSec);

    //時に整形
    this.hour = this.conv2hour(0,0,tmpTime);
    //一時保管用の秒数を更新（時に整形した分を差し引く）
    tmpTime = tmpTime - this.hour*3600;

    //分に整形
    this.min = this.conv2min(0,0,tmpTime);
    //一時保管用の秒数を更新（時に整形した分を差し引く）
    tmpTime = tmpTime - this.min*60;

    //秒に整形（小数などの整理）
    this.sec = this.conv2sec(0,0,tmpTime);
    
    console.log(this.hour,"h",this.min,"m",this.sec,"s");
  }

  conv2hour(inH,inM,inS){
    return Math.floor(inH + inM/60 + inS/(60*60));
  }

  conv2min(inH,inM,inS){
    return Math.floor(inH*60 + inM + inS/60);
  }

  conv2sec(inH,inM,inS){
    return Math.floor(inH*60*60 + inM*60 + inS);
  }
}
