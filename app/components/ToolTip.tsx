'use client'

import * as Tooltip from '@radix-ui/react-tooltip';
import { PlusIcon } from '@radix-ui/react-icons';
import { User } from '@prisma/client';
import { Avatar } from '@radix-ui/themes';

const ToolTip = ({ user }: { user: User }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Avatar
                        src={user.image!}
                        fallback='?'
                        size='2'
                        radius='full'
                    />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content sideOffset={7}>
                        {user.name}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default ToolTip;
