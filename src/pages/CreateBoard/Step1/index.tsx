import React, { useContext, useState } from 'react'
import { OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd'
import { ICoords } from '../../../interfaces/game'
import { generateEmptyArr, isBoardValid } from '../../../utils/box'
import { CreateBoardContext } from '../context'
import Step1Component from './Step1.component'

export default function Step1() {
  const [isDropDisabled, setIsDropDisabled] = useState(false)
  const { setStep, board, setBoard } = useContext(CreateBoardContext)

  const size = 60

  const onDragStart: OnDragStartResponder | undefined = (a) => {
    if (a.draggableId.endsWith("king") && board.flat().find(b => b === a.draggableId[0] + a.draggableId.slice(2))) setIsDropDisabled(true)
  }

  const onDragEnd: OnDragEndResponder = (a) => {
    const coords = a.destination?.droppableId.split("-").map(a => +a)
    setIsDropDisabled(false)
    const piece = a.source.droppableId
    if (!coords || !piece) return
    const [row, column] = coords
    const newBoard = structuredClone(board)
    newBoard[row][column] = piece[0] + piece.slice(2)
    setBoard(newBoard)
    return false
  }

  const remove = ({ row, column }: ICoords) => {
    const newBoard = structuredClone(board)
    newBoard[row][column] = ""
    setBoard(newBoard)
  }

  const pieces = [
    "W-king",
    "W-queen",
    "W-rook",
    "W-bishop",
    "W-knight",
    "W-pawn",
    "B-king",
    "B-queen",
    "B-rook",
    "B-bishop",
    "B-knight",
    "B-pawn",
  ]

  const clear = () => {
    setBoard(generateEmptyArr())
  }

  const nextt = () => {
    if (isBoardValid(board)) setStep(2)
    else alert("Not enough pieces on board")

  }

  const props = {
    clear,
    pieces,
    remove,
    onDragEnd,
    onDragStart,
    isDropDisabled,
    board,
    size,
    next: nextt
  }

  return (
    <Step1Component {...props} />
  )
}
