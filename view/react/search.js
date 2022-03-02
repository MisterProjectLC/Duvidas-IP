const config = require("../../src/config");

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lang: 0, language:"English", dropdownMenu: false };
        this.languageClicked = this.languageClicked.bind(this);
        this.sandwichClicked = this.sandwichClicked.bind(this);
        this.mapProjects = this.mapProjects.bind(this);
        console.log("Heroku app");
    }

    componentDidMount() {
        $('#language').on('click', this.languageClicked);
        $('#languageDropdown').on('click', this.languageClicked);
        $('#sandwich').on('click', this.sandwichClicked);

        $(window).resize(function() {
            let aspect_ratio = $(window).width()/$(window).height();
            if (aspect_ratio > 11/7) {
                $("#links a").css("opacity", "100%");
            } else {
                $("#links a").css("opacity", "0%");
            }
            $("#languageDropdown").css("opacity", "0%");
        });
    }

    render() {
        return (<div style="width: 100%;height: 100%;">
        <div style="width: 100%;height: 100%;position: absolute;" onclick="removeBox()">
        </div>
          
        <div id="navBar"> </div>

        <div id="searchDiv" class="form-group">

            <div id="flexDiv" style="display: inline-flex;">

              
              <input id="protocol" type="text" class="form-control shadow-none" id="protocol" placeholder={config.materia+"-xxxx-0000"} maxlength="12"/>

              <button id="send" type="button" class="btn btn-primary" onclick="checkValues()">
                  <i class="fa fa-search"></i>
                </button>
            </div>
          </div>

          <div id="fileCard" class ="fileCard" style="display: none;">
              <div id="cardSucesso" class="card" style="border: none;display: block;">
                <div class="card-header" style="width: 100%; height: 0; position: relative;margin-bottom: 3.5%;" onclick="removeBox()">
                  <div id="boxColor" class="card-header">
                        
                      <span class="dot" style=" background-color: #DB4437;"></span> 
                      <span class="dot" style="background-color: #F4B400;"></span> 
                      <span class="dot" style="background-color: #0F9D58;"></span> 
                      
                  </div>
      
                  <div class="boxTitleDiv">
                    <label id="protocoloText" class="boxTitle" style=" color: white;">Protocolo</label>
                  </div>
  
                  <div class="boxTitleDiv" style="text-align: right;left:-20">
                      <label id="status" class="boxTitle" style=" color: red;">Não respondida</label>
                    </div>
                </div>
      
                <div class="card-body" style="text-align: center;">
                  <h5 id="listaEx" >L00EX00</h5>
                  <h3 id="titulo" >Título da Pergunta</h3>
      
                  <label id="nomeRA" style="color:#6d757d;display: block;">
                    Nome da pessoa que perguntou (RA)
                  </label>
                  
                  <textarea class="form-control" id="duvida" rows="20" style="background-color: white;resize: none;margin:2%;margin-left: 0;" aria-describedby="duvidaHelp" readonly></textarea>
  
                  <textarea class="form-control" id="comentario" rows="2" style="color: white;background-color: rgb(31, 136, 31);resize: none;margin:2%;margin-left: 0;" aria-describedby="duvidaHelp" readonly>Comentário: </textarea>
                  
                  <label id="monitor" style="color:#6d757d;display: block;">
                      Dúvida respondida por 
                    </label>

                </div> 
              </div>
          </div>  
          
          
          <div id="question">
          
          </div>
      </div>)
    }
}

ReactDOM.render(<Main/>, document.getElementById('start'))