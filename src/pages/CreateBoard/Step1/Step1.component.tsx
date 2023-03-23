import { DragDropContext, Draggable, Droppable, OnDragEndResponder, OnDragStartResponder } from "react-beautiful-dnd";
import { AiOutlineClose } from "react-icons/ai";
import { GreenButton, RedButton } from "../../../components/Button";
import { RenderPieceElement } from "../../../components/RenderPieceElement";
import { ICoords } from "../../../interfaces/game";
import { Div, Flex } from "../../../tJS/styledComponents";
import { getBoxColor } from "../../../utils/box";
import { colorsValues } from "../../../utils/constants";
import useRedux from "../../../utils/redux";


export default function Test({ onDragStart, onDragEnd, clear, board, isDropDisabled, size, pieces, remove, next }: {
    clear: () => void;
    pieces: string[];
    remove: ({ row, column }: ICoords) => void;
    onDragEnd: OnDragEndResponder;
    onDragStart: OnDragStartResponder;
    isDropDisabled: boolean;
    board: string[][];
    size: number,
    next: Function
}) {
    const { activeColor } = useRedux()


    return (
        <DragDropContext
            // onBeforeCapture={onBeforeCapture}
            // onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            // onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Flex flexDirection='column' gap={20}>
                <Flex gap={20}>
                    <GreenButton onClick={next}>Next</GreenButton>
                    <RedButton onClick={clear}>Clear</RedButton>
                </Flex>
                <Div display='grid' gridTemplateColumns={`repeat(8, ${size}px)`} gap={10}>
                    {board.map((rowArr, row) =>
                        rowArr.map((columnValue, column) => {
                            let className: string = colorsValues[activeColor as keyof typeof colorsValues] + getBoxColor({ row: row, column: column })
                            return <Droppable key={`${row}-${column}`} droppableId={`${row}-${column}`} type="PERSON" isDropDisabled={isDropDisabled || (columnValue ? true : false)}>
                                {(provided, snapshot) => (
                                    <Div
                                        height={size}
                                        ref={provided.innerRef}
                                        className={className}
                                        {...provided.droppableProps}
                                        border={snapshot.isDraggingOver ? '2px solid blue' : ""}
                                        position="relative"
                                    >
                                        <Draggable draggableId={`${row}-${column}`} index={row} isDragDisabled={true}>
                                            {(provided, snapshot) => (
                                                <Div
                                                    height={size}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {columnValue &&
                                                        <Div
                                                            position='absolute'
                                                            top='3px'
                                                            right='3px'
                                                            bg='#ba2e2e'
                                                            display='flex'
                                                            borderRadius='50%'
                                                            p={3}
                                                            fontSize={10}
                                                            alignitems='center'
                                                            justifyContent='center'
                                                            cursor='pointer'
                                                            onClick={() => remove({ row, column })}
                                                        >
                                                            <AiOutlineClose color='white' />
                                                        </Div>
                                                    }
                                                    <RenderPieceElement className='piece' boxValue={`${columnValue[0]}-${columnValue.slice(1)}`} />
                                                </Div>
                                            )}
                                        </Draggable>
                                        {provided.placeholder}
                                    </Div>
                                )}
                            </Droppable>
                        }
                        )
                    )
                    }
                </Div>
                <Div display='grid' gridTemplateColumns={`repeat(6, ${size}px)`} gap={10} justifyContent="center">
                    {pieces.map((a, inx) =>
                        <Droppable key={inx} droppableId={`${a}`} type="PERSON" isDropDisabled={true}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: 'grey', height: size, width: size }}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                    <Draggable draggableId={`${a}`} index={inx}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <RenderPieceElement className='piece' boxValue={a} />
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            )}
                        </Droppable>
                    )}
                </Div>
            </Flex>
        </DragDropContext>

    )
}
