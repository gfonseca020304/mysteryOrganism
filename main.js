// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, dnaBaseArr) => {
  return {
    _specimenNum : num,
    _dna : dnaBaseArr,
    get specimenNum() {
      return this._specimenNum
    },
    get dna() {
      return this._dna
    },
    mutate() {
      let randomPosition = Math.floor(Math.random() * this._dna.length)
      let randomValue = this._dna[randomPosition] 
      let randomBase = returnRandBase()
      while (randomValue === randomBase) {
        randomBase = returnRandBase()
      }
      this._dna[randomPosition] = randomBase
    },
    compareDNA(pAequor) {
      let alike_dna = this._dna.filter((base, i) => {
        if (base === pAequor.dna[i]) {
          return true
        } else {
          return false
        }
      })
      const percentage = ((((15 - alike_dna.length) / 15) * 100) - 100) * -1
      //console.log(`pAequor #${this._specimenNum} and pAequor #${pAequor.specimenNum} are ${percentage.toFixed(2)}% identical in ${alike_dna.length} locations.`)
    },
    willLikelySurvive() {
      let counter = {}
      let a = this._dna.forEach(base => {
        if (counter[base]) {
          counter[base] += 1
        } else {
          counter[base] = 1
        }
      })
      function percentage(base) {
        return ((((15 - base) / 15) * 100) - 100) * -1
      }
      //console.log(`C percentage is: ${percentage(counter['C'])}, they are ${counter['C']}`)
      //console.log(`C percentage is: ${percentage(counter['G'])}, they are ${counter['G']}`)
      if (percentage(counter['C']) >= 60 || percentage(counter['G']) >= 60) {
        return true
      } else {
        return false
      }
    }
  }

}
/*const p1 = pAequorFactory(1, mockUpStrand())
console.log(p1.dna)

console.log(p1.willLikelySurvive())*/

const living_pAequors = []
let count = 1
for (let i = 1; i <= 30; i++) {
  let pAequorInstance = pAequorFactory(i, mockUpStrand())
  count++
  while (true) {
    if (pAequorInstance.willLikelySurvive()) {
      living_pAequors.push(pAequorInstance)
      break
    } else {
      pAequorInstance = pAequorFactory(i, mockUpStrand())
      count++
      continue
    }
  }
}
console.log(count)
console.log(`There are ${living_pAequors.length} living pAequors collected from ${count} instantiations`)




