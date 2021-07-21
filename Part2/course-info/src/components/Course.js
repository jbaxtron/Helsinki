import React from 'react'


const Course = ({course}) => {

  

    return(
      <div>
      {course.map((course)=><div key={course.id}> <Header name={course.name} /> <Content courses={course.parts} /> </div>)}
      </div>
    )
  }
  
  
  const Header = (props) => {
    
    return (
      
      <h1>{props.name}</h1>
      
    )  
  }
  
  const Content = ({courses}) => {
  return(
    <div>
    {courses.map((parts) =>
     <p key={parts.id}>
       {parts.name}  {parts.exercises}
     </p>
     )}
     <Total  courses={courses} />
    </div>
  )
  }
  
  const Total = ({courses}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    return(
      
      <div>
        <p><b>Total of {courses.map(courses => courses.exercises).reduce(reducer)} exercises</b>
        
        
        </p>
      </div>
    )
  
  
    }
    export default Course