class DeltaTransitionFunctionsTab {

    constructor() {
        this.name = 'Delta Trnansition Functions';
    }

    load(pane) {


        let bholder = document.querySelector('.bottom_holder');
        if(bholder){
            bholder.style.overflow = 'scroll';
            bholder.style.overflowX = 'hidden';
        }

        let h = document.createElement('h3');
        h.style.color = 'white';
        h.textContent = this.name + ":";

        pane.appendChild(h);

        this.addTransitionsToPane(pane);

        let holder = document.createElement('div');

        const DELTA = '𝛿';
        let p0 = document.createElement('p');
        p0.style.color = 'white';
        p0.innerHTML = `${DELTA} ( <input class='at_button' id="node_in" type="text"></input>,<input class='at_button' id="trule" type="text"></input> ) = <input class='at_button' id="node_out" type="text"></input>`;

        let btn = document.createElement('button');
        btn.className = 'addTransitionButton';
        btn.textContent = 'Add Transition';

        btn.addEventListener('click', () => {
            let in_node = document.getElementById('node_in').value;
            let rule = document.getElementById('trule').value;
            let out_node = document.getElementById('node_out').value;

            if (workspace.name == 'DFA') {
                if(getAutomataNodes().length > 0 && workspace.getAutomata().getNodeFromName(in_node).hasConnectionWithRule(rule)){
                    createCard('Transition with this rule already exists!', 'red');
                    return;
                }
            }

            if (workspace.addDeltaTransition(in_node, rule, out_node)) {
                document.getElementById('node_in').value = '';
                document.getElementById('trule').value = '';
                document.getElementById('node_out').value = '';
                this.addTransitionsToPane(pane);
            }
        });

        holder.appendChild(p0);
        holder.appendChild(btn);

        holder.style.display = 'flex';
        holder.style.flexDirection = 'row';
        holder.style.alignItems = 'center';

        pane.appendChild(holder);
    }

    addTransitionsToPane(pane) {

        pane.children.forEach(c => {
            if(c.id == 'dtp'){
                c.remove();
            }
        }); 

        workspace.getDeltaTransitions().forEach(element => {
            let p = document.createElement('p');
            p.id = 'dtp';
            p.style.color = 'white';
            p.textContent = element;
            pane.appendChild(p);
        });
    }

}