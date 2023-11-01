import React, {Component, useEffect} from 'react'
import { TweenMax, TimelineMax, Power1 } from 'gsap';
import style from './style.scss'

export default class Slider extends Component{  
  constructor(props){
    super(props)
    
    this.items = this.props.payload.slice()
    
    this.itemsAmountPerSlide = this.props.itemsPerSlide
    this.slides = []
    this.slide = []
    this.slidesAmount = Math.ceil(this.items.length / this.itemsAmountPerSlide)
    this.wrapper = React.createRef()
    this.isFirst = true
    
    for(let i = 0; i < this.slidesAmount; i++){
      this.slide = []
      for(let j = 0; j < this.itemsAmountPerSlide; j++){
        if((j !== 0 && j % this.itemsAmountPerSlide === 0) || this.items.length === 0){
          break
        }
        this.slide.push(this.items.shift(j))
      }
      this.slides.push(this.slide)
    }
    this.slides.unshift(this.slides[this.slides.length-1])
    this.slides.push(this.slides[1])
    
    this._clickPrevious = this._clickPrevious.bind(this)
    this._clickNext = this._clickNext.bind(this)
    this._getActiveSlide = this._getActiveSlide.bind(this)
  }
  
  componentDidMount(){
    document.querySelectorAll('.slider__slide')[1].classList.add('active')
    this.slideWidth = document.querySelectorAll('.slider__slide')[1].clientWidth
    this.initPos = this.slideWidth - 49
    TweenMax.set(this.wrapper, {x: `${this.initPos * -1}`})
    
    if(this.isFirst){
     TweenMax.set(
       [
         document.querySelector(".slider__slide[index='0']"), 
         document.querySelector(".slider__button--previous")
       ], 
       {visibility: 'hidden'}
     )
    }
    
  }
  
  _getActiveSlide(){
    const active = document.querySelector('.slider__slide.active')
    const activeIndex = Number(active.getAttribute('index'))
    const prev = document.querySelector(`.slider__slide[index='${activeIndex - 1}']`)
    const next = document.querySelector(`.slider__slide[index='${activeIndex + 1}']`)

    return {prev, active, next}
  }
  
  _clickPrevious(){
    const {prev, active} = this._getActiveSlide()
    TweenMax.to(this.wrapper, .5, {x: `+=${this.slideWidth}`, ease: Power1.easeOut, onComplete: () => {
        active.classList.remove('active')
        if(active.getAttribute('index') == 1){
          TweenMax.set(this.wrapper, {x: `${((this.slideWidth * this.slidesAmount)-49)* -1}`})
          document.querySelector(`.slider__slide[index='${this.slidesAmount}']`).classList.add('active')
        }
        else{
          prev.classList.add('active')
        }
      }
    })
  }
  
  _clickNext(){
    const {active, next} = this._getActiveSlide()
    
    TweenMax.to(this.wrapper, .5, {x: `-=${this.slideWidth}`, ease: Power1.easeOut, onComplete: () => {
        active.classList.remove('active')
        if(active.getAttribute('index') == this.slidesAmount){
          TweenMax.set(this.wrapper, {x: `${this.initPos * -1}`})
          document.querySelector(`.slider__slide[index='1']`).classList.add('active')
        }
        else{
          next.classList.add('active')
        }
        if(this.isFirst){
          this.isFirst = false
          TweenMax.set(
           [
             document.querySelector(".slider__slide[index='0']"), 
             document.querySelector(".slider__button--previous")
           ], 
           {visibility: 'visible'}
         )
        }
      
      }
    })
  }
  
  render(){
    return (
      <div className="slider">
        <div className="slider__wrapper" ref={el => this.wrapper = el}>
          {this.slides.map((slide, index) => {
            return (
              <div key={index} className="slider__slide" index={index}>
                {slide.map((item, index) => <Item key={item.id} item={item} index={index} itemAmountPerSlide={this.itemsAmountPerSlide}/>)}
              </div>
            )
          })}
        </div>
        <div className="slider__button slider__button--previous" onClick={this._clickPrevious}></div>
        <div className="slider__button slider__button--next" onClick={this._clickNext}></div>
      </div>
    )
  }
}


const Item = ({ item, index, itemAmountPerSlide }) => {
  let titleRef = React.createRef()
  let thisSlider = React.createRef()
  let allSiblings, prevSiblings, nextSiblings
  
  let transfOrigin = 'center'
  let transfXPrev = '-100px'
  let transfXNext = '100px'
  
  let ageRest
  
  item.ageRestriction === 10
    ? ageRest = 'blue'
    : item.ageRestriction === 12
      ? ageRest = 'yellow'
      : item.ageRestriction === 14
        ? ageRest = 'orange'
        : item.ageRestriction === 16
        ? ageRest = 'red'
        : ageRest = 'black'
  
  if(index === 0){
    transfOrigin = 'center left'
    transfXPrev = '0'
    transfXNext = '210px'
  }
  else if(index === itemAmountPerSlide - 1){
    transfOrigin = 'center right'
    transfXPrev = '-210px'
    transfXNext = '0'
  }
  
  useEffect( () => {
    allSiblings = Array.from(document.querySelectorAll('.slider__item'))
    
    const currentSliderIndex = allSiblings.findIndex(item => item === thisSlider)
    
    prevSiblings = allSiblings.filter((item,index) => index < currentSliderIndex)
    nextSiblings = allSiblings.filter((item,index) => index > currentSliderIndex)
  }, [])
  
  const _mouseEnter = ({ target }) => {
    let tl = new TimelineMax()
    
    const styles = {
      scale: '1.7',
      transformOrigin: transfOrigin,
      boxShadow: 'inset 0px -41px 100px 25px rgba(0,0,0,0.8)',
      border: '1px solid black',
      ease: Power1.easeInOut,
      onStart: () => TweenMax.set(target, {zIndex: 4}),
    }
    
    tl
      .to(target, .3, styles, 'a')
      .to(prevSiblings, .3, {x: transfXPrev, ease: Power1.easeInOut}, 'a')
      .to(nextSiblings, .3, {x: transfXNext, ease: Power1.easeInOut}, 'a')
      .to(titleRef, .3, {autoAlpha: 1}, '-=.15')
  }
  
  const _mouseLeave = ({ target }) => {
    let tl = new TimelineMax()
    
    const styles = {
      scale: '1', 
      transformOrigin: transfOrigin,
      zIndex: 1,
      boxShadow: 'inset 0px 0px 0px 0px rgba(0,0,0,0)', 
      border: '0',
      ease: Power1.easeInOut,
      onComplete: () => TweenMax.set(titleRef, {autoAlpha: 0}),
    }
    
    tl
      .to(target, .3, styles, 'a')
      .to(prevSiblings, .3, {x: '0', ease: Power1.easeInOut}, 'a')
      .to(nextSiblings, .3, {x: '0', ease: Power1.easeInOut}, 'a')
      .to(titleRef, .3, {autoAlpha: 0}, 'a')
  }
  
  return (
    <div className="slider__item" style={{"backgroundImage": `url(${item.imageUrl})`}} onMouseEnter={e => _mouseEnter(e)} onMouseLeave={e => _mouseLeave(e)} ref={el => thisSlider = el}>
      <div className="slider__item-wrapper" ref={el => titleRef = el}>
        <div className="slider__item-title">{item.title}</div>
        <div className="slider__item-text">
          <span className="slider__item-text--green">{item.calories} kcal </span>
          <span className={`slider__item-badge slider__item-badge--${ageRest}`}>{item.ageRestriction}</span> 
          <span className="slider__item-duration">{`${parseInt(item.duration / 60)}h ${item.duration % 60}min`}</span> 
        </div>
        <div className="slider__item-text">
          <ul className="slider__item-list">
            <li>{item.tags[0]}</li>
            <li>{item.tags[1]}</li>
            <li>{item.tags[2]}</li>
          </ul> 
        </div>
      </div>
    </div>
  )
}

