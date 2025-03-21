import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import {  Children } from "react"
import "./stylonator.css"

export default function Tindernator() {
  return (
    <div>
<div className="tinder">
  <div className="tinder--status">
    <i className="fa fa-remove"></i>
    <i className="fa fa-heart"></i>
  </div>

  <div className="tinder--cards">
    <div className="tinder--card">
      <img src="https://placeimg.com/600/300/people" />
      <h3>Demo card 1</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>
    <div className="tinder--card">
      <img src="https://placeimg.com/600/300/animals" />
      <h3>Demo card 2</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>
    <div className="tinder--card">
      <img src="https://placeimg.com/600/300/nature" />
      <h3>Demo card 3</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>
    <div className="tinder--card">
      <img src="https://placeimg.com/600/300/tech" />
      <h3>Demo card 4</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>
    <div className="tinder--card">
      <img src="https://placeimg.com/600/300/arch" />
      <h3>Demo card 5</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>
  </div>

  <div className="tinder--buttons">
    <button id="nope"><i className="fa fa-remove"></i></button>
    <button id="love"><i className="fa fa-heart"></i></button>
  </div>
</div>
    </div>
  );
}
