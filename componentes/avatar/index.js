/* eslint-disable @next/next/no-img-element */
import avatarImg from '../../public/imagens/avatar.svg'

export default function Avatar({ src }) {
    const getAvatar = () => {
        if(src && src !== 'undefind') {
            return src;
        }

        return avatarImg.src;
    }

    return (
        <img
        alt='Avatar'
            src={getAvatar()}
            className='avatar'
        />
    );
}