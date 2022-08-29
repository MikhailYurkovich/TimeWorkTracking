export class CalculateState {
  constructor(Mounth) {
    this.Mounth = Mounth;
    this.timeWork = 0;
    this.salary = 0;
  }

  //Оплата по тарифу и кол-во часов за месяц
  totalTimeWorkSalary() {
    if (this.Mounth) {
      for (let i = 0; i < this.Mounth.listWorks.length; i++) {
        this.timeWork += this.Mounth.listWorks[i].timeWork / 60;
        this.salary +=
          (this.Mounth.listWorks[i].timeWork / 60) *
          this.Mounth.listWorks[i].salarySettings.tarifRate;
      }
    }
  }
  get timeWork_Salary() {
    this.totalTimeWorkSalary();
    return {
      salary: Math.round(this.salary * Math.pow(10, 2)) / Math.pow(10, 2),
      timeWork: this.timeWork,
    };
  }
}
