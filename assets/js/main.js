class ValidForms{
    constructor(){
        this.forms = document.querySelector('.formulario');
        this.events();
    }
    events(){
        this.forms.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const fieldValid = this.checkFields()
        const passValid = this.checkPass()

        if(fieldValid && passValid){
            alert('Formulario enviado')
            this.forms.submit()
        }
    }
    checkFields(){
        let isValid = true;
        for(let errorText of this.forms.querySelectorAll('.error-text')){
            errorText.remove()
        }
        for (let field of this.forms.querySelectorAll('.validate')){
            // Pega o elemento irmão anterior
            const label = field.previousElementSibling.innerHTML;
            if(!field.value){
                this.generateError(field,`Campo ${label} não pode estar vazio`)
                isValid = false;
            }
            if(field.classList.contains('cpf')){
                if(!this.cpfValid(field)) isValid = false
            }
            if(field.classList.contains('usuario')){
                if(!this.userValid(field)) isValid = false
            }
        }

        return isValid;
    }
    checkPass(){
        let isValid = true;

        const pass = this.forms.querySelector('.senha');
        const repeatPass = this.forms.querySelector('.repetir-senha');

        if(pass.value !== repeatPass.value){
            isValid = false;
            this.generateError(pass, "As senhas não conferem")
            this.generateError(repeatPass, "As senhas não conferem")
        }
        if(pass.value.length < 6 || pass.value.length > 12){
            isValid = false;
            this.generateError(pass, "A senha precisa ter entre 6 e 12 caracteres" )
        }
        return isValid;
    }
    generateError(field, msg){
        const div = document.createElement('div')
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div)
    }

    cpfValid(field){
        const cpf = new ValidCPF(field.value)
        let isValid = true
        if(!cpf.isValid()){
            this.generateError(field, "CPF Inválido")
            isValid = false;
        }
        return isValid
    }
    userValid(field){
        const user = field.value;
        let isValid = true
        if(user.length < 3 || user.length > 12){
            this.generateError(field, "Usuário deve ter entre 3 e 12 caracteres");
            isValid = false;
        }
        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.generateError(field, "Nome de usuário deve conter apenas letras e/ou números");
            isValid = false;
        }
        return isValid
    }

}

const valida = new ValidForms();