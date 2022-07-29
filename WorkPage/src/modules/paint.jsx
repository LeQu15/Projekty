import React from 'react';

class Paint extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.ctxRef = React.createRef()
        this.state = {
            color: '#000000',
            bgcColor: this.props.bgc,
            lineWidth: 3,
            isPainting: false,
            shape: 'round',
            buttonText: <i class="fa-solid fa-square"></i>
        }
    }

    componentDidMount() {
        const canvas=this.canvasRef.current
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight
        const ctx = canvas.getContext('2d')
        this.ctxRef.current = ctx;
        this.ctxRef.current.strokeStyle = this.state.color
        this.ctxRef.current.lineWidth = this.state.lineWidth
        this.ctxRef.current.lineCap = this.state.shape;
        this.ctxRef.current.lineJoin = this.state.shape;
        if(this.props.canvas!=='') {
        let img = new Image();
        img.src = this.props.canvas;
        img.onload =() => {
            this.ctxRef.current.drawImage(img, 0 ,0) 
        }
        }
    }

    updateCanvas() {
        this.ctxRef.current.strokeStyle = this.state.color
        this.ctxRef.current.lineWidth = this.state.lineWidth
        this.ctxRef.current.lineCap = this.state.shape;
        this.ctxRef.current.lineJoin = this.state.shape;
    }

    clear = () => {
        this.ctxRef.current.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)
    }

    changeColor = (e) => {
        this.setState({
            color: e.target.value
        }, () => {
            this.updateCanvas()
        })

    }

    changeShape = () => {
        this.setState({
            shape: this.state.shape === 'square' ? 'round' :'square',
        }, () => {
            this.updateCanvas()
        })
    }

    changeBgcColor =(e) => {
        this.setState({
            bgcColor: e.target.value
        }, () => {
            this.props.get({
                bgc: this.state.bgcColor,
                canvas: this.canvasRef.current.toDataURL("image/png")
            })
        })
    }

    changeWidth = (e) => {
        this.setState({
            lineWidth: e.target.value
        },() => {
            this.updateCanvas()
        })
    }

    startPaint = (e) => {
        this.ctxRef.current.beginPath();
        this.ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        )
        this.setState({
            isPainting: true
        })
    }

    paint = (e) => {
        if(this.state.isPainting === true) {
            this.ctxRef.current.lineTo(
                e.nativeEvent.offsetX,
                e.nativeEvent.offsetY
            )
            this.ctxRef.current.stroke()
        }
    }

    endPaint = () => {
        this.ctxRef.current.closePath();
        this.setState({
            isPainting: false
        }, () => {
            this.props.get({
                bgc: this.state.bgcColor,
                canvas: this.canvasRef.current.toDataURL("image/png")
            })
        })
        this.saveImage()
    }

    saveImage = (e) => {
        let img = new Image();
        img.src = this.canvasRef.current.toDataURL("image/png");
        img.onload =() => {
            this.ctxRef.current.fillStyle = this.state.bgcColor
        this.ctxRef.current.fillRect(0,0,this.canvasRef.current.width, this.canvasRef.current.height)
            this.ctxRef.current.drawImage(img, 0 ,0)
            this.setState({
                imageHref: this.canvasRef.current.toDataURL("image/png")
            })
            this.ctxRef.current.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)
            this.ctxRef.current.drawImage(img, 0 ,0) 
        }
    }



    render() {
        return <><div id="toolbar">
            <button id="clearCanvas" onClick={this.clear}><i className="fa-solid fa-trash-can"></i></button>
            <div><label htmlFor="color">Color: </label>
            <input id="color" name = "color" type="color" value={this.state.color} onChange={this.changeColor}></input></div>
            <div><label htmlFor="color">Background: </label>
            <input id="bgccolor" name = "bgccolor" type="color" value={this.state.bgcColor} onChange={this.changeBgcColor}></input></div>
            <div><label htmlFor="Width">Width: </label>
            <input id="lineWidth" name = "lineWidth" type="number" value={this.state.lineWidth} onChange={this.changeWidth}></input></div>
            <div><button onClick={this.changeShape}>{this.state.shape === 'round' ? <i className="fa-solid fa-circle"></i>: <i class="fa-solid fa-square"></i>}</button></div>
        </div><div id="board"><canvas style={{backgroundColor: this.state.bgcColor}} ref={this.canvasRef} onMouseLeave={this.endPaint} onMouseDown={this.startPaint} onMouseMove = {this.paint} onMouseUp={this.endPaint}></canvas></div><div id="save"><a onClick={this.saveImage} download href={this.state.imageHref}><i className="fa-solid fa-file-arrow-down"></i></a></div></>
    }
}



export default Paint