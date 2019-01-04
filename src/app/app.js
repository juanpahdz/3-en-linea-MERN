import React, { Component } from 'react'
import Counter from './Componets/Counter.js'
import uid from 'uid'
import History from './Componets/History.js'

class App extends Component{
    constructor(){
        super()
        this.state = {
            turn: 'X',
            status: 'in progress',
            squares: '',
            message: '¿ Are we ready to start ?',
            totalMoves: 0,
            board: Array(9).fill(''),
            boards: []
        }
    }

    componentWillMount() {
        this.restart()
    }
    


    checkWinner = () => {
        let winnerCombos = [
            ['0','1','2'],
            ['3','4','5'],
            ['6','7','8'],
            ['0','3','6'],
            ['1','4','7'],
            ['2','5','8'],
            ['0','4','8'],
            ['2','4','6']
        ]

        for (let i = 0; i < winnerCombos.length; i++){
            const [a, b, c] = winnerCombos[i]
            if(this.state.board[a] && this.state.board[a] == this.state.board[b] && this.state.board[a] == this.state.board[c]){
                
                // determinate who win
                if(this.state.turn == 'X'){
                    this.setState({
                        status:'Winner X',
                        message: 'the winner is X',
                        turn:''
                    })
                }
                else{
                    this.setState({
                        status:'Winner O',
                        message: 'the winner is O',
                        turn:''
                    })
                }
            }

        }

        return 'winner'
    }
  
    draw = () =>{
        this.setState({
            status: 'Draw',
            message:'Draw',
            turn:'',
        })
    }

    clicked = (e) => {
        let index = e.target.dataset.squares
        if(this.state.status == 'in progress'){
        if(this.state.board[index]  == '' ) {
            this.state.board[index] = this.state.turn
            e.target.innerText = this.state.turn
            this.setState({
                turn: this.state.turn == 'X' ? 'O' : 'X',
                totalMoves: this.state.totalMoves == 8 ? this.draw() : this.state.totalMoves+1,
            })
            this.checkWinner()
        }
    }
    }

    restart = () => {
        
        if(this.state.status == 'Winner X' || this.state.status == 'Draw' || this.state.status == 'Winner O' ){
            this.fetchBoardsPost()
            this.fetchBoards()
        }
        this.setState({
            board: Array(9).fill(''),
            turn: 'X',
            totalMoves:0,
            status: 'in progress',
            message: '¿are we ready to start?',
            squares: <div className="row bigboard" onClick={(e) => { this.clicked(e)}} >
                        {this.state.board.map( (squares, key ) => {
                            return <div className="square" data-squares={key} key={uid()}></div>
                        })
                        }
            </div>
        })

        
    }

    render(){
        return (
            <React.Fragment>
                <div className="container app">
                    <div className="message text-center text-uppercase mb-5">
                        <h1> { this.state.message } </h1>
                    </div>
                     <div className="row">

                        {/* col-3 */}

                        <div className="col-3 counter-panel">
                            <Counter status={this.state.status} turn={this.state.turn}>
                            </Counter>
                        </div>

                        {/* col-5 */}

                        <div className="col-5 game">
                            { this.state.squares }
                        </div>

                        {/* col-4 */}

                        <div className="col-4 historial">
                            <History state={this.state.boards}/>
                        </div>    
                     </div>

                     <section>
                         <div className="control-panel">
                            <button className="btn btn-secundary btn-panel" onClick={(e) => this.restart(e) }>Restart</button>
                            <button className="btn btn-secundary btn-panel" >Pause</button>
                            <button className="btn btn-secundary btn-panel" onClick={(e) => this.deleteHistory}>Delete history</button>
                         </div>
                     </section>    
                </div>
            </React.Fragment>
        )
    }
}

export default App