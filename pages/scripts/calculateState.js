import React from 'react';

export class CalculateState {
  constructor(timeWorkSum, stateStats) {
    this.timeWorkSum = timeWorkSum;
    this.tariffRate = stateStats.tariffRate;
    this.premium = stateStats.premium;
    this.profMaster = stateStats.profMaster;
    this.workExperiens = stateStats.workExperiens;
    this.incomeTax = stateStats.incomeTax;
    this.pensionFund = stateStats.pensionFund;
    this.unionDues = stateStats.unionDues;
    this.prepaid = stateStats.prepaid;
  }

  set timeWork(value) {
    this.timeWorkSum = value;
  }

  get fullSettlement() {
    return {
      timeWork: this.timeWorkSum,
      totalTimeWorkSum: this.totalTimeWorkSum(),
      totalPremium: this.totalPremium(),
      totalProfMaster: this.totalProfMaster(),
      totalWorkExperiens: this.totalWorkExperiens(),
      totalSumm: this.totalSumm(),
      totalIncomeTax: this.totalIncomeTax(),
      totalPensionFund: this.totalPensionFund(),
      totalUnionDues: this.totalUnionDues(),
      totalPrepaid: this.totalPrepaid(),
      totalWithheld: this.totalWithheld(),
      totalWithheldNoPrepaid: this.totalWithheldNoPrepaid(),
      wage: this.wage(),
      salary: this.salary(),
    };
  }

  //Оплата по тарифу
  totalTimeWorkSum() {
    return Math.round(this.timeWorkSum * this.tariffRate * 100) / 100;
  }

  // Премия
  totalPremium() {
    return (
      Math.round((this.totalTimeWorkSum() / 100) * this.premium * 100) / 100
    );
  }

  // Профессиональное масстерство
  totalProfMaster() {
    return (
      Math.round((this.totalTimeWorkSum() / 100) * this.profMaster * 100) / 100
    );
  }

  //   Выслуга лет
  totalWorkExperiens() {
    return (
      Math.round((this.totalTimeWorkSum() / 100) * this.workExperiens * 100) /
      100
    );
  }
  //   Итого начислено
  totalSumm() {
    return (
      Math.round(
        (this.totalTimeWorkSum() +
          this.totalPremium() +
          this.totalProfMaster() +
          this.totalWorkExperiens()) *
          100,
      ) / 100
    );
  }

  //Удержания
  // Подоходный налог
  totalIncomeTax() {
    return Math.round((this.totalSumm() / 100) * this.incomeTax * 100) / 100;
  }

  // Пенсионный фонд
  totalPensionFund() {
    return Math.round((this.totalSumm() / 100) * this.pensionFund * 100) / 100;
  }

  // Профсоюзные взносы
  totalUnionDues() {
    return Math.round((this.totalSumm() / 100) * this.unionDues * 100) / 100;
  }

  //   Аванс
  totalPrepaid() {
    if (
      this.totalSumm() <
      this.prepaid +
        this.totalIncomeTax() +
        this.totalPensionFund() +
        this.totalUnionDues()
    ) {
      return 0;
    } else {
      return Math.round(this.prepaid * 100) / 100;
    }
  }
  // Удержано
  totalWithheld() {
    return (
      Math.round(
        (this.totalPrepaid() +
          this.totalIncomeTax() +
          this.totalPensionFund() +
          this.totalUnionDues()) *
          100,
      ) / 100
    );
  }
  totalWithheldNoPrepaid() {
    return (
      Math.round(
        (this.totalIncomeTax() +
          this.totalPensionFund() +
          this.totalUnionDues()) *
          100,
      ) / 100
    );
  }

  //   К выдаче
  wage() {
    return Math.round((this.totalSumm() - this.totalWithheld()) * 100) / 100;
  }

  salary() {
    return (
      Math.round((this.totalSumm() - this.totalWithheldNoPrepaid()) * 100) / 100
    );
  }
}

// export default CalculateState;
