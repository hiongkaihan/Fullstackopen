const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  return (
    <p><b>total of {parts.reduce(((sum, part) => sum + part.exercises), 0)} exercises</b></p>
  )
}

const Course = ({courses}) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </>
  )
}

export default Course;