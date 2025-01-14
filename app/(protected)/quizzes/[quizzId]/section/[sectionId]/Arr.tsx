import React from 'react'

function Arr({ items, sectionId }: any) {

  var userAnswer = [{
    id: "1",
    'quizzId': 'clzmen4rg00015q3yhcuucorr',
    'questionId': 'clzv72ywx005wvf5f1pcyvkja',
    'questionOptionId': 'clzv72ywx005xvf5fql96erbx',
    'trueOrFalse': true
  },
  {
    id: "2",
    'quizzId': 'clzmen4rg00015q3yhcuucorr',
    'questionId': 'clzv72ywx005wvf5f1pcyvkja',
    'questionOptionId': 'clzv72ywx005xvf5fql96erbx',
    'trueOrFalse': true
  },
  {
    id: "3",
    'quizzId': 'clzmen4rg00015q3yhcuucorr',
    'questionId': 'clzv72ywx005wvf5f1pcyvkja',
    'questionOptionId': 'clzv72ywx005xvf5fql96erbx',
    'trueOrFalse': true
  },
  ];

  // const d=a.filter((i:any) => !b.find((f:any) => f.id === i.id));
  const it = items.quizzesSection.filter((x: any) => x?.id == sectionId)

  const userAnswers = (id: any) => {
    return userAnswer.filter((i: any) => i.questionOptionId == id)
  }
  const sortQuestions = (array: any) => {
    let arr = array.map((m: any) => ({
      ...m,
      count: userAnswers(m?.id).length > 0 ? userAnswers(m?.id).length : 0,

    }

    ))

    return arr;
  }




  let newdata = it[0]?.questions.map((d: any) => (
    {
      //  ...d,

      // options:      sortQuestions(d.questionOptions).sort(
      //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),
      // options:      sortQuestions(d.questionOptions)
      // optionGroup: groupBy(sortQuestions(d.questionOptions).sort(
      //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),"count"),
      // minCountGroup:Object(groupBy(sortQuestions(d.questionOptions).sort(
      //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),"count"))[0],
      randomOrder: getShuffledArr(Object(groupBy(sortQuestions(d.questionOptions).sort(
        (p1: any, p2: any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0), "count"))[0])[0]



    }))

  const questionArray = newdata.map((x: any) => ({
    ...x.randomOrder
  }))



  function groupBy(arr: any, property: any) {
    return arr.reduce(function (memo: any, x: any) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  };


  function getShuffledArr(arr: any) {

    return arr ? arr.reduce(
      (newArr: any, _: any, i: any) => {
        var rand = i + (Math.floor(Math.random() * (newArr.length - i)));
        [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]]
        return newArr
      }, [...arr]
    ) : []
  }




  return (
    <div>
      {
        JSON.stringify(questionArray)
      }
    </div>
  )
}

export default Arr
