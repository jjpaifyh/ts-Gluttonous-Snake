// import './less/tcs.less'
// 食物
class food{
    // 定义一个属性表示属性对于元素
    element:HTMLElement
    constructor(){
        this.element=document.querySelector('#food')!
    }
    get X(){
        return this.element.offsetLeft
    }
    get Y(){
        return this.element.offsetTop
    }
    // 改变食物位置 
    change(){
        let left=Math.round(Math.random()*29)*10
        let top=Math.round(Math.random()*29)*10
        this.element.style.left=left+'px'
        this.element.style.top=top+'px'
    }
}



// 蛇
class Snake{
    // 蛇头
    head:HTMLElement
    // 蛇身体
    bodies:HTMLCollection
    // 获取蛇容器
    element:HTMLElement
    constructor(){
        this.element=document.querySelector('#snake')!
        this.head=document.querySelector('#snake>div') as HTMLElement
        this.bodies=document.getElementById('snake')!.getElementsByTagName('div')
    }
    //获取蛇头坐标
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
    // 设置蛇头坐标
    set X(value:number){
        if(this.X===value)return
        this.head.style.left=value+'px'
        // X 0-290
        if(value<0||value>290){
            throw new Error("12")
        }
        this.moveBody()
        this.checkHBody()
    }
    set Y(value:number){
        if(this.Y===value)return
        this.head.style.top=value+'px'

        if(value<0||value>290){
            throw new Error("12")
        }
        this.moveBody()
        this.checkHBody()
    }


    // 添加蛇身体
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }
    // 添加一个蛇身体移动的方法
    moveBody(){
        
        for(let i=this.bodies.length-1;i>0;i--){
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }

    // 检查身体
    checkHBody(){
        for(let i=3;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement
            if(this.X===bd.offsetLeft && this.Y===bd.offsetTop){
                throw new Error("吃自己了")
            }
        }
    }
}



// 记分牌
class ScorePanel{
    score=0
    level=1
    maxleve:number
    up:number
    scoreEle:HTMLElement
    levelEle:HTMLElement
    // maxleve可穿可不穿
    constructor(maxleve:number=10,up:number=10){
        this.scoreEle=document.querySelector("#score_01")!
        this.levelEle=document.querySelector("#leve")!
        this.maxleve=maxleve
        this.up=up     
    }
    addscore(){
        this.scoreEle.innerHTML=++this.score+''
        if(this.score%this.up===0)this.addleve()
    }

    addleve(){
        if(this.level==this.maxleve)return
        this.levelEle.innerHTML=++this.level+''
    }
}




class GameContrlos{
    // 蛇
    snake:Snake
    food:food
    ScorePanel:ScorePanel

    n:string='ArrowDown'

    // 存储蛇移动方向
    direction='ArrowDown'

    // 游戏是否结束
    isLive:boolean=true

    constructor(x:number=10,y:number=10){
        this.snake=new Snake()
        this.food=new food()
        this.ScorePanel=new ScorePanel(x,y)
        this.init()
    }

    // 游戏初始化
    init(){
       document.addEventListener('keydown',this.keydownHandler.bind(this))
       this.run()
    }
    // 键盘按下响应
     keydownHandler(event:KeyboardEvent){
         this.direction=event.key
     }

    //  蛇移动
    run(){
        let X=this.snake.X
        let Y=this.snake.Y
        
        // 按键方向修改xy
        switch(this.direction){
            case "ArrowUp":
                if(this.n==="ArrowDown"){
                    Y+=10
                    break
                }
                Y-=10
                this.n=this.direction
                break
            case "ArrowDown":
                if(this.n==="ArrowUp"){
                    Y-=10
                    break
                }
                Y+=10
                this.n=this.direction
                break
            case "ArrowLeft":
                if(this.n==="ArrowRight"){
                    X+=10
                    break
                }
                X-=10
                this.n=this.direction
                break
            case "ArrowRight":
                if(this.n==="ArrowLeft"){
                    Y-=10
                    break
                }
                X+=10
                this.n=this.direction
                break 
        }
        
        if(this.checkEat(X,Y)){
            console.log('吃');
            this.food.change()
            this.ScorePanel.addscore()
            this.snake.addBody()
            
        }

        try{
            this.snake.X=X
            this.snake.Y=Y
        }catch(e){
            this.isLive=false
            alert("游戏结束")
        }

        this.isLive&&setTimeout(this.run.bind(this),300-(this.ScorePanel.level-1)*30)
    }

    // 吃到食物
    checkEat(X:number,Y:number){
        return X==this.food.X && Y==this.food.Y
    }


}

new GameContrlos(10,10)










