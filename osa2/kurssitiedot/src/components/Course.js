const Course = ({ course }) => {

    return (
        <div>
        <Header course={course.name} />
        <Content parts ={course.parts} />
        <Total parts={course.parts} />
        </div>
    )

    

}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => <Part key={part.id} part={part} />
        )
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>

    )
}



export default Course