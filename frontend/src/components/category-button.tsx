export function CategoryButton({text, selected, onClick}: {text: string, selected: boolean, onClick: () => void}){
    return (
        <button
        onClick={onClick} 
        className={`${selected ? 'bg-blue-500' : 'bg-[#171717]'} px-[1rem] py-[0.4rem] rounded-lg cursor-pointer transition-all ease-in hover:scale-105`}
        >
            {text}
        </button>
    )
}