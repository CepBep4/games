import { useState } from 'react'

export const Header = () => {
  function help(){
    alert('Кнопка START -> \nИгра начнётся, белые начинают, нажимайте на фигуру чтобы сходить \nКнопка CANCEL ->\nОтменит выбранную фигуру\nКнопка ROTATE ->\nВключает переворот доски при ходе\nКнопка STOP ->\nОстановит игру')
  }
  return (
    <div className='head-container'>
        <div className='head-lable'>ChessTon</div>
        <div className='head-time' onClick={help}>Как играть?</div>
    </div>
  )
}
