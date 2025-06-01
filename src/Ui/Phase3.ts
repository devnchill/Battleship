class Phase3 {
  constructor() {
    this.logHello();
    document.body.innerHTML = "";
    document.body.classList.remove("phase2");
    document.body.classList.add("phase3");
  }
  logHello(): void {
    console.log("hello");
  }
}
export default Phase3;
