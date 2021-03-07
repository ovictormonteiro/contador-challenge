export default class countDown{
  constructor(futureDate){
    this.futureDate = futureDate;    
  }

  get _actualDate(){
    return new Date();
  }

  get _futureDate(){
    return new Date(this.futureDate);
  }

  get _timeStampDiff(){
    const result = this._futureDate.getTime() - this._actualDate.getTime();
    if(result < 0 ){
      return alert('Coloque uma data maior do que a presente');
    }
    return result;
  }

  get days(){
    return Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000));
  }

  get hours(){
    return Math.floor(this._timeStampDiff / (60 * 60 * 1000));
  }

  get minutes(){
    return Math.floor(this._timeStampDiff / (60 * 1000));
  }

  get seconds(){
    return Math.floor(this._timeStampDiff / 1000);
  }

  get total(){
    const days = this.days;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;
    return {
      days,
      hours,
      minutes,
      seconds
    }
  }

}
