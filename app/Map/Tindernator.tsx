// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import './stylonator.css';
import { X, Check } from '@phosphor-icons/react';
import { NavLink } from "react-router";
import { Button } from '~/components/ui/button';

import { GlobalContext } from '../Map/Globalstate';
import { obstacles } from './obstacles';

interface Card {
  id: Number;
  content: String;
}

export function Tindernator(props: { cards: (Card | undefined)[] }) {
  const cards = props.cards;
  const tinderContainerRef = useRef(null);
  const nopeRef = useRef(null);
  const loveRef = useRef(null);
  const [responses, setResponses] = useState<bool[]>([]);

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
        const keep = (Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5);

        event.target.classList.add('removed');
        setResponses(responses.concat(event.deltaX > 0))
        console.log("resp " + responses);

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
  }, [responses]);

  const calcSeverities = (ctx) => {
    let featSum = [0, 0, 0, 0];
    responses.forEach((response, idx) => {
      const card = cards[idx];
      if (response) {
        featSum = featSum.map((val, i) => val + card.features[i]);
      }
    });
    
    featSum = featSum.map((val) => val / responses.length);
    console.log("user profile", featSum);
    
    let newSev = ctx?.severeties;
    obstacles.forEach((obstacle, idx) => {
      let maxdist = 0;
      obstacle.features.forEach((feat, i) => {
        maxdist = Math.max(maxdist, Math.max(0, featSum[i] - obstacle.features[i]));
      });
      newSev[idx] = maxdist;
    });
    console.log(newSev);
    let maxsev = newSev.reduce((a, b) => Math.max(a, b));
    console.log(maxsev);
    newSev = newSev.map((val) => 1 - (val / maxsev));
    ctx?.setSevereties(newSev);
  }


  
  const createButtonListener = (love, ctx) => (event) => {
    const allCards = document.querySelectorAll('.tinder--card:not(.removed)');
    const moveOutWidth = document.body.clientWidth * 1.5;

    if (!allCards.length) return false;

    const card = allCards[0];
    setResponses(responses.concat(love))
    card.classList.add('removed');
    document.querySelectorAll('.tinder--card:not(.removed)')[0].classList.add(".loaded")
    if (love) {
      card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
    } else {
      card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
    }
    event.preventDefault();
  };

  const allCardsProcessed = responses.length >= cards.length;

  return (
    <>
      {!allCardsProcessed && (
        <p className="mb-4">
          Swipe through obstacles, tell us what matters,
          and let our smart system guide you on the smoothest path.

          Is this a major obstacle for you? Right for Yes, Left for No.
        </p>)}
      <div className="tinder flex-column" ref={tinderContainerRef}>

        <div className="tinder--cards inset-shadow-sm">
          {cards.map((card) => (
            <img id={card.id} src={card?.content} key={card.id} className="tinder--card rounded-2xl" draggable="false" />
          ))}
        </div>

        {!allCardsProcessed && (
            <GlobalContext.Consumer>
              {(ctx) => (
              <div className="tinder--buttons">
                  <button
                    ref={nopeRef}
                    id="nope"
                    onClick={createButtonListener(false, ctx)}
                  >
                    <X size={32} weight="bold" />
                  </button>
                <button
                  ref={loveRef}
                  id="love"
                  onClick={createButtonListener(true, ctx)} >
                  <Check size={32} weight="bold" />
                  {/*<label className='mt-10 text-primary'>Obstacle?</label>*/}
                </button>
              </div>
              )}
            </GlobalContext.Consumer>
            )}

        {/* Thank you message with NavLink */}
        {allCardsProcessed && (
         <>
            <h1 className='text-3xl font-extrabold mb-4'>All done!</h1>
            <p className='mb-[40px]'> We've got enough information to get you started. 
              As you use the app, our pathfinding will improve further. </p>
            <center>

            <GlobalContext.Consumer>
              {(context) => (
                <Button onClick={() => {
                  context?.setOnMap(true);
                  calcSeverities(context);
                }}>Start exploring</Button>
              )}
            </GlobalContext.Consumer>
              </center>
          </>
        )}
      </div>
    </>
  );
};