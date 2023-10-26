const slideData = [
	{
	  index: 0,
	  headline: 'General IQ Test',
	  button: 'Test IQ Now',
	  src: 'https://www.verywellmind.com/thmb/BmNBn15vDt5Af3IksoEO9EU_nHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1009465514-5bf1e681c9e77c00264870f6.jpg',
	  
	},
	
	{
	  index: 1,
	  headline: 'Machine Learning',
	  button: 'Test IQ in Machine Learning',
	  src: 'https://cdn.sanity.io/images/tlr8oxjg/production/ada93729daf922ad0318c8c0295e5cb477921808-1456x816.png?w=3840&q=80&fit=clip&auto=format' },
	
	{
	  index: 2,
	  headline: 'Cyber Security',
	  button: 'Test IQ in Cyber Security',
	  src: 'https://vitbhopal.ac.in/file/2022/04/Cyber-Security1.jpg' },
	
	{
	  index: 3,
	  headline: 'Medical',
	  button: 'Test IQ in Medical',
	  src: 'https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*' }];
	
	
	
	
	// =========================
	// Slide
	// =========================
	
	class Slide extends React.Component {
	  constructor(props) {
		super(props);
	
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleSlideClick = this.handleSlideClick.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
		this.slide = React.createRef();
	  }
	
	  handleMouseMove(event) {
		const el = this.slide.current;
		const r = el.getBoundingClientRect();
	
		el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
		el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
	  }
	
	  handleMouseLeave(event) {
		this.slide.current.style.setProperty('--x', 0);
		this.slide.current.style.setProperty('--y', 0);
	  }
	
	  handleSlideClick(event) {
		this.props.handleSlideClick(this.props.slide.index);
	  
		// Check the text of the button clicked
		const buttonText = this.props.slide.button;
	  
		// Define the URLs for each category
		const categoryURLs = {
		  'Test IQ Now': '/generalized_iq_test',
		  'Test IQ in Machine Learning': '/ml_test',
		  'Test IQ in Cyber Security': '/cs_test',
		  'Test IQ in Medical': '/med_test',
		};
	  
		// Redirect to the URL based on the button text
		const categoryURL = categoryURLs[buttonText];
		if (categoryURL) {
		  window.location.href = categoryURL;
		}
	  }
	  
	  imageLoaded(event) {
		event.target.style.opacity = 1;
	  }
	
	  render() {
		const { src, button, headline, index } = this.props.slide;
		const current = this.props.current;
		let classNames = 'slide';
	
		if (current === index) classNames += ' slide--current';else
		if (current - 1 === index) classNames += ' slide--previous';else
		if (current + 1 === index) classNames += ' slide--next';
	
		return /*#__PURE__*/(
		  React.createElement("li", {
			ref: this.slide,
			className: classNames,
			onClick: this.handleSlideClick,
			onMouseMove: this.handleMouseMove,
			onMouseLeave: this.handleMouseLeave }, /*#__PURE__*/
	
		  React.createElement("div", { className: "slide__image-wrapper" }, /*#__PURE__*/
		  React.createElement("img", {
			className: "slide__image",
			alt: headline,
			src: src,
			onLoad: this.imageLoaded })), /*#__PURE__*/
	
	
	
		  React.createElement("article", { className: "slide__content" }, /*#__PURE__*/
		  React.createElement("h2", { className: "slide__headline" }, headline), /*#__PURE__*/
		  React.createElement("button", { className: "slide__action btn" }, button))));
	
	
	
	  }}
	
	
	
	// =========================
	// Slider control
	// =========================
	
	const SliderControl = ({ type, title, handleClick }) => {
	  return /*#__PURE__*/(
		React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick }, /*#__PURE__*/
		React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" }, /*#__PURE__*/
		React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));
	
	
	
	};
	
	
	// =========================
	// Slider
	// =========================
	
	class Slider extends React.Component {
	  constructor(props) {
		super(props);
	
		this.state = { current: 0 };
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleSlideClick = this.handleSlideClick.bind(this);
	  }
	
	  handlePreviousClick() {
		const previous = this.state.current - 1;
	
		this.setState({
		  current: previous < 0 ?
		  this.props.slides.length - 1 :
		  previous });
	
	  }
	
	  handleNextClick() {
		const next = this.state.current + 1;
	
		this.setState({
		  current: next === this.props.slides.length ?
		  0 :
		  next });
	
	  }
	
	  handleSlideClick(index) {
		if (this.state.current !== index) {
		  this.setState({
			current: index });
	
		}
	  }
	
	  render() {
		const { current, direction } = this.state;
		const { slides, heading } = this.props;
		const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
		const wrapperTransform = {
		  'transform': `translateX(-${current * (100 / slides.length)}%)` };
	
	
		return /*#__PURE__*/(
		  React.createElement("div", { className: "slider", "aria-labelledby": headingId }, /*#__PURE__*/
		  React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform }, /*#__PURE__*/
		  React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),
	
		  slides.map(slide => {
			return /*#__PURE__*/(
			  React.createElement(Slide, {
				key: slide.index,
				slide: slide,
				current: current,
				handleSlideClick: this.handleSlideClick }));
	
	
		  })), /*#__PURE__*/
	
	
		  React.createElement("div", { className: "slider__controls" }, /*#__PURE__*/
		  React.createElement(SliderControl, {
			type: "previous",
			title: "Go to previous slide",
			handleClick: this.handlePreviousClick }), /*#__PURE__*/
	
	
		  React.createElement(SliderControl, {
			type: "next",
			title: "Go to next slide",
			handleClick: this.handleNextClick }))));
	
	
	
	
	  }}
	
	
	
	ReactDOM.render( /*#__PURE__*/React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));