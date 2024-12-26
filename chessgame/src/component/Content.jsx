import { useState } from 'react'
import peshkapng from '../assets/peshka.png'
import tyrapng from '../assets/tyra.png'
import hoursepng from '../assets/hourse.png'
import oficerpng from '../assets/oficer.png'
import queenpng from '../assets/queen.png'
import kingpng from '../assets/king.png'

let CoordPressed = null;
let onStep=false;
let nowFigure=null;
let whiteOnTop=true;
let nowStep=true;
let addonCoord = [];
let playOffline = true;
let historyGame = [];
let gamerColor = false;
let rotate=false;

let map_figure = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

class Peshka{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.checkStep=false;
    this.element = undefined;
    this.elementId=undefined;
    this.attak = false;
    this.imsrc = peshkapng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img class="figure-i-w" src="${peshkapng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img class="figure-i-b" src="${peshkapng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep = undefined;
    if(!onStep & this.color==nowStep & !this.attak){
      let stepAccept=3;
      if(this.checkStep){stepAccept = 2;}
      else{stepAccept = 3;}
      let countAcceptStep = 0;
      this.checkStep=true;
      if (this.color & whiteOnTop){
        let xyz_map = document.getElementsByName('sq')
        for(let i = 1; i<stepAccept; i++){
          if(xyz_map[(this.y+i)*8+this.x].innerHTML==''){
            xyz_map[(this.y+i)*8+this.x].innerHTML='<div class="ph-help"></div>'
            countAcceptStep++;
          }
          else{
            break
          }
        }
        onStep=true;
        nowFigure=this;
      }
      else{
        let xyz_map = document.getElementsByName('sq')
        for(let i = 1; i<stepAccept; i++){
          if(xyz_map[(this.y-i)*8+this.x].innerHTML==''){
            xyz_map[(this.y-i)*8+this.x].innerHTML='<div class="ph-help"></div>'
            countAcceptStep++;
          }
          else{
            break
          }
        }
        onStep=true;
        nowFigure=this;       
      }
    }
    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      if(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
        addonCoord.push([this.x-1, this.y+1])
        countAcceptStep++;
      }
      if(xyz_map[(this.y+1)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
        addonCoord.push([this.x+1, this.y+1])
        countAcceptStep++;
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      if(xyz_map[(this.y-1)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
        addonCoord.push([this.x-1, this.y-1])
        countAcceptStep++;
      }
      if(xyz_map[(this.y-1)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
        addonCoord.push([this.x+1, this.y-1])
        countAcceptStep++;
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}

class Tyra{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.element = undefined;
    this.elementId=undefined;
    this.imsrc = tyrapng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-w" src="${tyrapng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-b" src="${tyrapng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep=undefined;
    if(!onStep & this.color==nowStep){
      let stepAccept=8;
      let countAcceptStep = 0;
      let xyz_map = document.getElementsByName('sq')
      for(let i = 1; i<stepAccept-this.y; i++){
        if(xyz_map[(this.y+i)*8+this.x].innerHTML==''){
          xyz_map[(this.y+i)*8+this.x].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        if(xyz_map[(this.y-i)*8+this.x].innerHTML==''){
          xyz_map[(this.y-i)*8+this.x].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<stepAccept-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML==''){
          xyz_map[this.y*8+(this.x+i)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML==''){
          xyz_map[this.y*8+(this.x-i)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      onStep=true;
      nowFigure=this;
    }
    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      for(let i = 1; i<8-this.y; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y+i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y-i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<8-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y])
          countAcceptStep++;
          break
        }
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      for(let i = 1; i<8-this.y; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y+i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y-i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<8-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y])
          countAcceptStep++;
          break
        }
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}

class Hourse{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.element = undefined;
    this.elementId=undefined;
    this.imsrc = hoursepng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-w" src="${hoursepng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-b" src="${hoursepng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep=undefined;
    if(!onStep & this.color==nowStep){
      let stepAccept=2;
      let countAcceptStep = 0;
      let xyz_map = document.getElementsByName('sq')
      if(this.x>=1 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x-1)].innerHTML==''){
          xyz_map[(this.y+2)*8+(this.x-1)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x+1)].innerHTML==''){
          xyz_map[(this.y+2)*8+(this.x+1)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x >= 1 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x-1)].innerHTML==''){
          xyz_map[(this.y-2)*8+(this.x-1)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x+1)].innerHTML==''){
          xyz_map[(this.y-2)*8+(this.x+1)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x+2)].innerHTML==''){
          xyz_map[(this.y-1)*8+(this.x+2)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y<=6){ 
        if(xyz_map[(this.y+1)*8+(this.x+2)].innerHTML==''){
          xyz_map[(this.y+1)*8+(this.x+2)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x-2)].innerHTML==''){
          xyz_map[(this.y-1)*8+(this.x-2)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y <= 6){
        if(xyz_map[(this.y+1)*8+(this.x-2)].innerHTML==''){
          xyz_map[(this.y+1)*8+(this.x-2)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
      }

      onStep=true;
      nowFigure=this;
    }
    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      if(this.x>=1 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-1, this.y+2])
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+1, this.y+2])
          countAcceptStep++;
        }
      }
      if(this.x >= 1 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-1, this.y-2])
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+1, this.y-2])
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x+2)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+2, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y<=6){ 
        if(xyz_map[(this.y+1)*8+(this.x+2)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+2, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x-2)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-2, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y <= 6){
        if(xyz_map[(this.y+1)*8+(this.x-2)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-2, this.y+1])
          countAcceptStep++;
        }
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      if(this.x>=1 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-1, this.y+2])
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y<=5){
        if(xyz_map[(this.y+2)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+1, this.y+2])
          countAcceptStep++;
        }
      }
      if(this.x >= 1 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-1, this.y-2])
          countAcceptStep++;
        }
      }
      if(this.x <= 6 & this.y>=2){
        if(xyz_map[(this.y-2)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+1, this.y-2])
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x+2)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+2, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x <= 5 & this.y<=6){ 
        if(xyz_map[(this.y+1)*8+(this.x+2)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+2, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y>=1){
        if(xyz_map[(this.y-1)*8+(this.x-2)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-2, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x >= 2 & this.y <= 6){
        if(xyz_map[(this.y+1)*8+(this.x-2)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-2, this.y+1])
          countAcceptStep++;
        }
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}

class Oficer{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.element = undefined;
    this.elementId = undefined;
    this.imsrc = oficerpng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-w" src="${oficerpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-b" src="${oficerpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep=undefined;
    if(!onStep & this.color==nowStep){
      let stepAccept=8
      let countAcceptStep = 0;
      let xyz_map = document.getElementsByName('sq')

      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML==''){
          xyz_map[(this.y+i)*8+(this.x+i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML==''){
          xyz_map[(this.y-i)*8+(this.x-i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML==''){
          xyz_map[(this.y-i)*8+(this.x+i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML==''){
          xyz_map[(this.y+i)*8+(this.x-i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }


      onStep=true;
      nowFigure=this;
    }

    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}
class Queen{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.element = undefined;
    this.elementId = undefined;
    this.imsrc = queenpng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-w" src="${queenpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-b" src="${queenpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep=undefined;
    if(!onStep & this.color==nowStep){
      let stepAccept=8
      let countAcceptStep = 0;
      let xyz_map = document.getElementsByName('sq')
      for(let i = 1; i<stepAccept-this.y; i++){
        if(xyz_map[(this.y+i)*8+this.x].innerHTML==''){
          xyz_map[(this.y+i)*8+this.x].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        if(xyz_map[(this.y-i)*8+this.x].innerHTML==''){
          xyz_map[(this.y-i)*8+this.x].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<stepAccept-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML==''){
          xyz_map[this.y*8+(this.x+i)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML==''){
          xyz_map[this.y*8+(this.x-i)].innerHTML='<div class="ph-help"></div>'
          countAcceptStep++;
        }
        else{
          break
        }
      }
      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML==''){
          xyz_map[(this.y+i)*8+(this.x+i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML==''){
          xyz_map[(this.y-i)*8+(this.x-i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML==''){
          xyz_map[(this.y-i)*8+(this.x+i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML==''){
          xyz_map[(this.y+i)*8+(this.x-i)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
        else{
          break;
        }
      }


      onStep=true;
      nowFigure=this;
    }

    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      for(let i = 1; i<8-this.y; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y+i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y-i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<8-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){break};
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      for(let i = 1; i<8-this.y; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y+i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.y+1; i++){
        // alert(xyz_map[(this.y+i)*8+this.x].innerHTML.indexOf("figure-i-b"))
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[(this.y-i)*8+this.x].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y-i])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<8-this.x; i++){
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[this.y*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<this.x+1; i++){
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-b")!=-1){break};
        if(xyz_map[this.y*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y])
          countAcceptStep++;
          break
        }
      }
      for(let i = 1; i<min([7-this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([7-this.x, this.y])+1; i++){
        if(xyz_map[(this.y-i)*8+(this.x+i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+i, this.y-i])
          countAcceptStep++;
          break;
        }
      }
      for(let i = 1; i<min([this.x, 7-this.y])+1; i++){
        if(xyz_map[(this.y+i)*8+(this.x-i)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-i, this.y+i])
          countAcceptStep++;
          break;
        }
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}
class King{
  constructor(xyz, color){
    this.x = xyz[0];
    this.y = xyz[1];
    this.color = color;
    this.element = undefined;
    this.elementId = undefined;
    this.imsrc = kingpng;
  }

  place(){
    if (this.color){
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-w" src="${kingpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()})
      this.elementId = `${this.x} ${this.y}`;
    }
    else{
      let xyz_map = document.getElementsByName('sq')
      xyz_map[this.y*8+this.x].innerHTML=`<div id="${this.x} ${this.y}" class="figure-d"><img name="tyraimg" class="figure-i-b" src="${kingpng}"/></div>`;
      this.element = document.getElementById(`${this.x} ${this.y}`)
      this.element.addEventListener('click', () => {this.handleClickFigure()});
      this.elementId = `${this.x} ${this.y}`;
    }
  }

  place_forget(){
    let xyz_map = document.getElementsByName('sq')
    xyz_map[this.y*8+this.x].innerHTML="";
  }

  move(xyz){
    this.place_forget()
    this.x=xyz[0]
    this.y=xyz[1]
    this.place()
  }

  handleClickFigure(){
    // alert(this.color)
    let countAcceptStep=undefined;
    if(!onStep & this.color==nowStep){
      let stepAccept=2
      let countAcceptStep = 0;
      let xyz_map = document.getElementsByName('sq')

      if(this.x < 7 & this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x+1)].innerHTML==''){
          addonCoord.push([this.x-1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x)].innerHTML==''){
          xyz_map[(this.y+1)*8+(this.x)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.y < 7 & this.x > 0){
        if(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML==''){
          xyz_map[(this.y+1)*8+(this.x-1)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.x > 0){
        if(xyz_map[(this.y)*8+(this.x-1)].innerHTML==''){
          xyz_map[(this.y)*8+(this.x-1)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.x > 0 & this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x-1)].innerHTML==''){
          xyz_map[(this.y-1)*8+(this.x-1)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x)].innerHTML==''){
          xyz_map[(this.y-1)*8+(this.x)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.y > 0 & this.x < 7){
        if(xyz_map[(this.y-1)*8+(this.x+1)].innerHTML==''){
          xyz_map[(this.y-1)*8+(this.x+1)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      if(this.x < 7){
        if(xyz_map[(this.y)*8+(this.x+1)].innerHTML==''){
          xyz_map[(this.y)*8+(this.x+1)].innerHTML='<div class="ph-help"></div>';
          countAcceptStep++;
        }
      }
      onStep=true;
      nowFigure=this;
    }

    //Проверка на возможность рубки белые
    let xyz_map = document.getElementsByName('sq')
    // alert(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b"))
    if (whiteOnTop & this.color & nowStep){
      if(this.x < 7 & this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y < 7 & this.x > 0){
        if(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.x > 0){
        if(xyz_map[(this.y)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-1, this.y])
          countAcceptStep++;
        }
      }
      if(this.x > 0 & this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x-1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x-1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.y > 0 & this.x < 7){
        if(xyz_map[(this.y-1)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+1, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x < 7){
        if(xyz_map[(this.y)*8+(this.x+1)].innerHTML.indexOf("figure-i-b")!=-1){
          addonCoord.push([this.x+1, this.y])
          countAcceptStep++;
        }
      }
    }
    else if (whiteOnTop & !this.color & !nowStep){
      if(this.x < 7 & this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y < 7){
        if(xyz_map[(this.y+1)*8+(this.x)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y < 7 & this.x > 0){
        if(xyz_map[(this.y+1)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.x > 0){
        if(xyz_map[(this.y)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-1, this.y])
          countAcceptStep++;
        }
      }
      if(this.x > 0 & this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x-1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x-1, this.y+1])
          countAcceptStep++;
        }
      }
      if(this.y > 0){
        if(xyz_map[(this.y-1)*8+(this.x)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.y > 0 & this.x < 7){
        if(xyz_map[(this.y-1)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+1, this.y-1])
          countAcceptStep++;
        }
      }
      if(this.x < 7){
        if(xyz_map[(this.y)*8+(this.x+1)].innerHTML.indexOf("figure-i-w")!=-1){
          addonCoord.push([this.x+1, this.y])
          countAcceptStep++;
        }
      }
    }
    if(countAcceptStep==0){
      onStep=false
      nowFigure=null
    }
  }
}

function min(arr) {
  if (arr.length === 0) {
    return undefined; // Или throw new Error("Array is empty");
  }
  return arr.reduce((min, current) => Math.min(min, current));
}

export const Content = () => {

  const map = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
  ]

  function removeLastElement(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }
  

  function checkCoord(xyz){
    // alert(JSON.stringify(addonCoord))
    // alert(xyz)
    for(let i = 0; i<addonCoord.length; i++){
      if(addonCoord[i][0]==xyz[0] & addonCoord[i][1]==xyz[1]){
        return true;
      }
    }
    return false;
  }

  function returnGame(){
    checkActiveButton()
    let xyz_map = document.getElementsByName('sq')
    onStep=false
    nowFigure=null
    addonCoord=[]
    for(let i = 0; i<xyz_map.length; i++){
      if(xyz_map[i].innerHTML=='<div class="ph-help"></div>'){
        xyz_map[i].innerHTML=""
      }
    }
  }

  function stopGame(){
    location.reload()
  }

  function rotateBoard(){
    checkActiveButton()
    if(rotate){
      rotate=false;
      playOffline=false;
      document.getElementsByClassName('table-map')[0].style.rotate='0deg';
      for(let i = 0; i<document.getElementsByClassName('figure-d').length; i++){
        document.getElementsByClassName('figure-d')[i].style.rotate='0deg';
      } 
    }
    else{
      rotate=true;
      playOffline=true;
    }
  }

  function startGame(){
    soundClick()
    checkActiveButton()
    for(let i = 0; i<8; i++){
      let f = new Peshka([i,1], true);
      map_figure[1][i] = f
      f.place()
    }
    for(let i = 0; i<8; i++){
      let f = new Peshka([i,6], false);
      map_figure[6][i] = f
      f.place()
    }
    map_figure[0][0] = new Tyra([0,0], true);
    map_figure[0][7] = new Tyra([7,0], true);
    map_figure[7][0] = new Tyra([0,7], false);
    map_figure[7][7] = new Tyra([7,7], false);
    map_figure[0][0].place()
    map_figure[0][7].place()
    map_figure[7][0].place()
    map_figure[7][7].place()
    map_figure[0][1] = new Hourse([1,0], true);
    map_figure[0][6] = new Hourse([6,0], true);
    map_figure[7][6] = new Hourse([6,7], false);
    map_figure[7][1] = new Hourse([1,7], false);
    map_figure[0][1].place();
    map_figure[0][6].place();
    map_figure[7][6].place();
    map_figure[7][1].place();
    map_figure[0][2] = new Oficer([2,0], true);
    map_figure[0][5] = new Oficer([5,0], true);
    map_figure[7][5] = new Oficer([5,7], false);
    map_figure[7][2] = new Oficer([2,7], false);
    map_figure[0][2].place()
    map_figure[0][5].place()
    map_figure[7][5].place()
    map_figure[7][2].place()
    map_figure[0][3] = new Queen([3,0], true)
    map_figure[7][4] = new Queen([4,7], false)
    map_figure[0][3].place()
    map_figure[7][4].place()
    map_figure[0][4] = new King([4,0], true)
    map_figure[7][3] = new King([3,7], false)
    map_figure[0][4].place()
    map_figure[7][3].place()

    if (gamerColor){
      document.getElementsByClassName('table-map')[0].style.rotate='180deg';
      for(let i = 0; i<document.getElementsByClassName('figure-d').length; i++){
        document.getElementsByClassName('figure-d')[i].style.rotate='180deg';
      }
    }
    else{
      document.getElementsByClassName('table-map')[0].style.rotate='0deg';
      for(let i = 0; i<document.getElementsByClassName('figure-d').length; i++){
        document.getElementsByClassName('figure-d')[i].style.rotate='0deg';
      }      
    }
  }

  function addDefeatWhite(element){
    let positions = document.getElementsByClassName('defeat-td-w-img')
    for(let i = 0; i<positions.length; i++){
      if(positions[i].name == 'free'){
        positions[i].src=element;
        positions[i].name='busi';
        break
      }
    }
  }
  function addDefeatBlack(element){
    let positions = document.getElementsByClassName('defeat-td-b-img')
    for(let i = 0; i<positions.length; i++){
      if(positions[i].name == 'free'){
        positions[i].src=element;
        positions[i].name='busi';
        break
      }
    }
  }

  function checkActiveButton(){
    let b = document.getElementById('ctc');

    b.style.opacity=1
    setTimeout(() => {
      let b = document.getElementById('ctc');

      b.style.opacity=0.3;
    },3000)
  }

  function soundClick() {
    var audio = new Audio('../assets/sound.mp3'); // Создаём новый элемент Audio
   // Указываем путь к звуку "клика"
    audio.play(); // Автоматически запускаем
  }

  function hClick(x,y){
    let xyz_map = document.getElementsByName('sq')
    let temp = undefined;
    if(xyz_map[y*8+x].innerHTML=='<div class="ph-help"></div>' | checkCoord([x,y]) & onStep){
      if(checkCoord([x,y])){
        if(map_figure[y][x].color){
          addDefeatWhite(map_figure[y][x].imsrc)
        }
        else{
          addDefeatBlack(map_figure[y][x].imsrc)
        }
      }
      temp = map_figure[nowFigure.y][nowFigure.x];
      map_figure[nowFigure.y][nowFigure.x] = 0;
      map_figure[y][x] = temp;
      nowFigure.move([x,y])
      if(nowFigure.color == true){
        nowStep=false;
        if(playOffline){
          document.getElementsByClassName('table-map')[0].style.rotate='0deg';
          for(let i = 0; i<document.getElementsByClassName('figure-d').length; i++){
            document.getElementsByClassName('figure-d')[i].style.rotate='0deg';
          }
        }
      }
      else{
        nowStep=true;
        if(playOffline){
          document.getElementsByClassName('table-map')[0].style.rotate='180deg';
          for(let i = 0; i<document.getElementsByClassName('figure-d').length; i++){
            document.getElementsByClassName('figure-d')[i].style.rotate='180deg';
          }
        }
      }
      onStep=false
      nowFigure=null
      addonCoord=[]
      for(let i = 0; i<xyz_map.length; i++){
        if(xyz_map[i].innerHTML=='<div class="ph-help"></div>'){
          xyz_map[i].innerHTML=""
        }
      }
    }

  }

  let isGame = false;

  return (
    <div className='content-container'>
      <table className='defeat-figure-table-b'>
      <tr className='tr-defeat'>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
        </tr>
        <tr className='tr-defeat'>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
          <td className='defeat-td-b'><div className='defeat-td-b-div'><img name="free" className='defeat-td-b-img' src=""/></div></td>
        </tr>
      </table>
      <table className='table-map'>
        <tbody>
          {map.map((w,i) => {
            return (<tr>
              {
                w.map((h,j) => {
                  return (<td onClick={() => {hClick(j,i)}} name="sq" className={'sq-'+h}></td>)
                })
              }
            </tr>);
          })}
        </tbody>
      </table>
      <table className='defeat-figure-table-w'>
        <tr className='tr-defeat'>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
        </tr>
        <tr className='tr-defeat'>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
          <td className='defeat-td-w'><div className='defeat-td-w-div'><img name="free" className='defeat-td-w-img' src=""/></div></td>
        </tr>
      </table>
      <div id='ctc' className='container-control'>
        <table className='control-table'>
          <td className='control-td'><button onClick={startGame} className='b-game'>START</button></td>
          <td className='control-td'><button onClick={returnGame} className='b-game'>CANCEL</button></td>
          <td className='control-td'><button onClick={stopGame} className='b-game'>STOP</button></td>
          <td className='control-td'><button onClick={rotateBoard} className='b-game'>ROTATE</button></td>
        </table>
      </div>
    </div>
  )
}
