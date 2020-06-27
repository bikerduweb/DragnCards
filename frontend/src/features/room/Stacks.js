import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Stack from "./Stack";
import { grid } from "./Constants";
import Title from "./Title";

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return 'hotpink';
  }
  if (isDraggingFrom) {
    return '';
  }
  return 'lime';
};

const Wrapper = styled.div`
  background-color: ${props => props.isDraggingOver ? "rgba(1,1,1,0.4)" : ""};
  padding: 0 0 0 0;
  height: 87%;
  transition: background-color 0.4s ease, opacity 0.1s ease;
  user-select: none;
  overflow-x: auto;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  display: flex;
  width: 100%;
  min-height: 100%;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div`
  height: 100%;
`;
/* stylelint-enable */

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
  return props.stacks.map((stack, stackIndex) => (
    <Draggable key={stack.id} draggableId={stack.id} index={stackIndex}>
      {(dragProvided, dragSnapshot) => (
        <Stack
          broadcast={props.broadcast}
          group={props.group}
          stackIndex={stackIndex}
          stack={stack}
          key={stack.id}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
          activeCard={props.activeCard}
          setActiveCard={props.setActiveCard}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { broadcast, group, stacks, dropProvided, activeCard, setActiveCard } = props;

  return (
    <Container>
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList 
          broadcast={broadcast} 
          group={group} 
          stacks={stacks}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function Stacks(props) {
  const {
    broadcast,
    group,
    stacks,
    isDropDisabled,
    isCombineEnabled,
    activeCard,
    setActiveCard,
  } = props;

  return (
    <Droppable
      droppableId={group.id}
      key={group.id}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      direction="horizontal"
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
            <InnerList
                broadcast={broadcast}
                group={group}
                stacks={stacks}
                dropProvided={dropProvided}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
            />
        </Wrapper>
      )}
    </Droppable>
  );
}