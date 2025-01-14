"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import StatCard from "./StatCard";
import { Bell, BellDot, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface QuizProps {
  userId: string | undefined;
  secQuestions: any;
  quizzId: any;
  sectionId: any;
  arrUserAn:any

}

const Quiz = ({arrUserAn, userId, secQuestions, quizzId, sectionId }: QuizProps) => {

  // const secQuestions: any = [
  //   {
  //     name: "aaa",
  //     answerOptions: [{id:"1",name:"a"}, {id:"2",name:"b"}, {id:"3",name:"c"}],
  //     trueOrFalse: "1",
  //     anTime:10
  //   },
  //   {
  //     name: "bbb",
  //     answerOptions: [{id:"1",name:"a"}, {id:"2",name:"b"}, {id:"3",name:"c"}],
  //     trueOrFalse: "2",
  //     anTime:15
  //   },
  //   // {
  //   //   name: "ccc",
  //   //   answerOptions: ["a", "b", "c"],
  //   //   trueOrFalse: "b",
  //   //   anTime:20
  //   // },
  //   // {
  //   //   name: "ddd",
  //   //   answerOptions: ["a", "b", "c"],
  //   //   trueOrFalse: "b",
  //   //   anTime:100
  //   // },
  //   // {
  //   //   name: "eee",
  //   //   answerOptions: ["a", "b", "c"],
  //   //   trueOrFalse: "b",
  //   //   anTime:15
  //   // }
  // ]
  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any | undefined>({ skiped: true });
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    trueOrFalses: 0,
    wrongAnswers: 0,
  });
  const [answerList, setAnswerList] = useState<any | undefined>([]);
  // const [antimeRemaining, setAnTimeRemaining] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(secQuestions.length > 0 ? secQuestions[0].anTime ? secQuestions[0].anTime : 25 : 25);
  const [timerRunning, setTimerRunning] = useState(false);


  const { name, trueOrFalse } =
    secQuestions[activeQuestion];
  const answerOptions = secQuestions[activeQuestion]?.answerOptions

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {

      timer = setTimeout(() => {
        setTimeRemaining((prevTime: any) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {


    if (activeQuestion !== secQuestions.length - 1) {
      setTimeRemaining(secQuestions[activeQuestion + 1].anTime ? secQuestions[activeQuestion + 1]?.anTime : 25);
    } else {
      // console.log("finished", activeQuestion + 1)

      // console.log("added to db")



    }
  };

  const handleTimeUp = () => {
    stopTimer();

    resetTimer();

    if (!showResults) {
      nextQuestion();
    }
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (
    answer: any,
    idx: number
  ) => {

    //  alert(JSON.stringify(answer))
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer.trueOrFalse) {
      setSelectedAnswer({ ...answer, skiped: false, givenAnswer: answer.name });
    } else {
      setSelectedAnswer({ ...answer, skiped: false, givenAnswer: answer.name });
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer({ skiped: true })

    setSelectedAnswerIndex(null);


    setResults((prev) =>
      selectedAnswer?.trueOrFalse==true
        ? {
          ...prev,
          score: prev.score + 1,
          trueOrFalses: prev.trueOrFalses + 1,
        }
        : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
    );
    // alert(JSON.stringify(selectedAnswer))
    // alert(JSON.stringify(secQuestions[activeQuestion]))  
    answerList.push({ ...secQuestions[activeQuestion], answerStatus: { ...selectedAnswer, correctAnswer: secQuestions[activeQuestion].answerOptions && secQuestions[activeQuestion].answerOptions.filter((x: any) => x.trueOrFalse == true)[0].name } })

    setAnswerList(answerList);

    const countCorrect: any = answerList.filter((x: any) => x.answerStatus.trueOrFalse == true)
    const countWrong: any = answerList.filter((x: any) => x.answerStatus.trueOrFalse == false)
    const skiped: any = answerList.filter((x: any) => x.answerStatus.skiped == true)

    setLoading(true)
    if (answerList.length == secQuestions.length) {
      fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: secQuestions.length,
          correctAnswers: countCorrect.length,
          wrongAnswers: countWrong.length,
          skiped: skiped.length,
          answers: answerList,
          quizzId: quizzId,
          sectionId: sectionId
        }),
      })
        .then((response) => {


          if (!response.ok) {
            toast.error(
              "Network response was not working fam"
            );
          }
          return response.json();
        })
        .then((data) => {
          toast.success(
            "Quiz results saved successfully:",
            data
          );
        })
        .catch((error) => {
          toast.error(
            "Error saving quiz results:",
            error
          );
        });
    }
    setLoading(false)

    if (activeQuestion !== secQuestions.length - 1) {

      setActiveQuestion((prev) => prev + 1);
    } else {



      setShowResults(true);
      stopTimer();



    }
    setChecked(false);
    resetTimer();
    startTimer();

    // alert(JSON.stringify(results1))
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
  const userAnsweringHistory=(v:string)=> arrUserAn.filter((x:any)=>x?.questionOptionsId==v)
  return (
    <div className="min-h-[500px]">
      <hr />



      {loading ? "Loading..." : ""}
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">

        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-primary text-white px-4 rounded-md py-1">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{secQuestions.length}</span>
                </h2>
              </div>
              <div className="md:flex md:gap-2 justify-end text-right">

                <div className={`border ${timeRemaining < 6 ? "border-red-500" : ""} bg-primary text-white px-4 rounded-md py-1 flex items-center`}>
                  <Bell className={` w-4 h-4 mr-2 ${timeRemaining < 6 ? "text-red-500" : "text-green-500"}`} />{timeRemaining} seconds to answer
                </div>
              </div>
            </div>

            <div>
              {/* <div className="mb-5 text-2xl font-bold"> */}
                <div dangerouslySetInnerHTML={{__html: name}}></div>
              
              <div>
                {answerOptions && answerOptions.length > 0 && answerOptions.map(
                  (answer: any) => (
                    <div
                    key={answer.id}
                      onClick={() =>
                        onAnswerSelected(answer, answer.id)
                      }
                      className={`bg-gray-100 border cursor-pointer mb-5 py-3 rounded-md hover:bg-primary hover:text-white px-3
                      ${selectedAnswerIndex === answer.id &&
                        "bg-primary text-white"
                        }
                      `}
                    >
                      <div dangerouslySetInnerHTML={{__html: answer?.name}}></div>
                     
                      
                    </div>
                  )
                )}
              </div>
              <button
                onClick={() => nextQuestion()}
                disabled={!checked}
                className="font-bold"
              >
                {activeQuestion === secQuestions.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">
              Results 📈
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                value={`${((results.trueOrFalses / secQuestions.length) * 100).toFixed(2)}%`}
              />

              <StatCard
                title="Total Questions"
                value={secQuestions.length}
              />
              <StatCard
                title=" Total Score"
                value={results.score}
              />
              <StatCard
                title="Correct Answers"
                value={results.trueOrFalses}
              />
              <StatCard
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 font-bold uppercase"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
      
      {showResults && answerList.map((i: any, index: number) => {
        return <div key={i?.id} className="border border-indigo-500 rounded-md p-3 mb-1">
            <div className="flex justify-between">
              <div><Badge className={i?.answerStatus?.skiped ? "text-yellow-500  flex" : "text-white  flex"}>Question <span className="ml-2">{index + 1}</span></Badge>
              </div>
          <div className="flex justify-end w-full overflow-auto mb-3 p-1"> 
{
  userAnsweringHistory(i?.id).map((z:any)=>{
    return <div key={z?.id} className={`${z?.trueOrFalse?"border  border-green-600 bg-green-200 ":"border  border-red-600 bg-red-200 "} w-3 h-3 mr-1`}>
      
    </div>
  })
}
<div className={`${i?.answerStatus?.trueOrFalse?"border  border-green-500 bg-green-300 ":"border  border-red-500 bg-red-300 "} w-3 h-3 mr-1`}>
      
    </div>
          </div>
            </div>

<div className="p-2">

<div dangerouslySetInnerHTML={{__html: i?.name}}></div>

{/* 
          {i?.name} */}
</div>
          {i?.answerOptions.map((x: any) => {
            return <div key={x?.id} className={`border  rounded-full  m-1  p-2 pl-3 ${i?.answerStatus?.skiped && "bg-yellow-100 border-yellow-500"} ${x?.trueOrFalse && i?.answerStatus?.trueOrFalse ? "bg-green-100 border-green-500  text-gray-800" : ""} ${x?.trueOrFalse && i?.answerStatus?.trueOrFalse == false ? "bg-red-100  border-red-500  text-gray-800" : ""}  `}>{x?.name} </div>
          })}
        </div>
      })}
    </div>
  );
};

export default Quiz;
