// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import './stylonator.css';

interface Card {
  id: Number;
  content: String;
}

export function Tindernator(props: { cards: (Card | undefined)[] }) {
  const cards = props.cards;

  const tinderContainerRef = useRef(null);
  const nopeRef = useRef(null);
  const loveRef = useRef(null);
  const [responses, setResponses] = useState<bool[]>([])


  useEffect(() => {
    const initCards = () => {
      if (tinderContainerRef.current) {
        tinderContainerRef.current.classList.add('loaded');
      }

      const newCards = document.querySelectorAll('.tinder--card:not(.removed)');

      newCards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
      });
    };

    initCards();

    const allCards = document.querySelectorAll('.tinder--card');

    allCards.forEach((el) => {
      const hammertime = new Hammer(el);

      hammertime.on('pan', (event) => {
        el.classList.add('moving');
      });

      hammertime.on('pan', (event) => {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        if (tinderContainerRef.current) {
          tinderContainerRef.current.classList.toggle(
            'tinder_love',
            event.deltaX > 0
          );
          tinderContainerRef.current.classList.toggle(
            'tinder_nope',
            event.deltaX < 0
          );
        }

        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
      });

      hammertime.on('panend', (event) => {
        el.classList.remove('moving');
        if (tinderContainerRef.current) {
          tinderContainerRef.current.classList.remove('tinder_love');
          tinderContainerRef.current.classList.remove('tinder_nope');
        }

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.add('removed');

        setResponses(responses + [keep])

        if (keep) {
          event.target.style.transform = '';
        } else {
          const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          const toX = event.deltaX > 0 ? endX : -endX;
          const endY = Math.abs(event.velocityY) * moveOutWidth;
          const toY = event.deltaY > 0 ? endY : -endY;
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          event.target.style.transform = `translate(${toX}px, ${toY + event.deltaY
            }px) rotate(${rotate}deg)`;
          initCards();
        }
      });
    });
  }, []);

  const createButtonListener = (love) => (event) => {
    const allCards = document.querySelectorAll('.tinder--card:not(.removed)');
    const moveOutWidth = document.body.clientWidth * 1.5;

    if (!allCards.length) return false;

    const card = allCards[0];
    setResponses(responses + [love])
    card.classList.add('removed');
    document.querySelectorAll('.tinder--card:not(.removed)')[0].classList.add(".loaded")
    if (love) {
      card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
    } else {
      card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
    }

    initCards();

    event.preventDefault();
  };

  return (
    <div className="tinder flex-column" ref={tinderContainerRef}>
      <div className="tinder--cards">
        {cards.map((card) => (
            <img src={card?.content} key={card.id}  className="tinder--card" draggable="false" />
        ))}
      </div>

      <div className="tinder--buttons">
        <button
          ref={nopeRef}
          id="nope"
          onClick={
            createButtonListener(false)
          }
        >
          No
        </button>
        <button
          ref={loveRef}
          id="love"
          onClick={
            createButtonListener(true)
          }
        >
          Slay queen
        </button>
      </div>

      <span>{responses.map(e => (<span>{e}</span>))}</span>
    </div>
  );
}