class ValidCPF{
    constructor(cpf){
        this.cpf = cpf;
    }

    getFormatCPF(){
        let cpf = String(this.cpf)
        return cpf.replace(/\D+/g, '')
    }

    isValid(){
        if(typeof this.cpf === 'undefined') return false
        const cpfFormat = this.getFormatCPF()
        if(cpfFormat.length !== 11) return false
        if(this.isSequence(cpfFormat)) return false
        
        // Remove os dois ultimos digitos do cpf
        const cpfPartial = cpfFormat.slice(0, -2)
        
        const firstDigit = this.generateDigit(cpfPartial)
        const secondDigit = this.generateDigit(cpfPartial + firstDigit)
        
        const newCpf = cpfPartial + firstDigit + secondDigit;
        
        if(newCpf !== cpfFormat) return false

        return true
    }

    generateDigit(cpfPartial){

        const cpfArray = Array.from(cpfPartial)
        let regressive = cpfArray.length + 1
        let total = cpfArray.reduce((ac, val) => {
            ac += (regressive * Number(val))
            regressive--;
            return ac;
        }, 0)

        let digit = 11 - (total % 11)
        return digit > 9 ? '0' : String(digit);
    }

    isSequence(cpfFormat){
        const sequence = cpfFormat[0].repeat(cpfFormat.length)
        return sequence === cpfFormat
    }

}
