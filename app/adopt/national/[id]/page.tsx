import { useRouter } from 'next/navigation'
import AnimalDetail from './_components/AnimalDetail'
import AnimalPolaroid from './_components/AnimalPolaroid'
import AnimalInfoText from './_components/AnimalInfoText'

const Detail: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between w-content m-center mb-[100px]">
        <AnimalPolaroid name="뚜비" />
        <AnimalInfoText />
      </div>
      <AnimalDetail type="dog" />
    </div>
  )
}

export default Detail
