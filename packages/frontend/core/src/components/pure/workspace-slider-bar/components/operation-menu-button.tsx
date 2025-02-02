import { toast } from '@affine/component';
import { IconButton } from '@affine/component/ui/button';
import { Menu } from '@affine/component/ui/menu';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { MoreHorizontalIcon } from '@blocksuite/icons';
import type { Workspace } from '@blocksuite/store';
import { useCallback } from 'react';

import { useBlockSuiteMetaHelper } from '../../../../hooks/affine/use-block-suite-meta-helper';
import { useTrashModalHelper } from '../../../../hooks/affine/use-trash-modal-helper';
import { usePageHelper } from '../../../blocksuite/block-suite-page-list/utils';
import { OperationItems } from './operation-item';

export type OperationMenuButtonProps = {
  pageId: string;
  workspace: Workspace;
  pageTitle: string;
  setRenameModalOpen: () => void;
  inFavorites?: boolean;
  isReferencePage?: boolean;
  inAllowList?: boolean;
  removeFromAllowList?: (id: string) => void;
};

export const OperationMenuButton = ({ ...props }: OperationMenuButtonProps) => {
  const {
    workspace,
    pageId,
    pageTitle,
    setRenameModalOpen,
    removeFromAllowList,
    inAllowList,
    inFavorites,
    isReferencePage,
  } = props;
  const t = useAFFiNEI18N();
  const { createLinkedPage } = usePageHelper(workspace);
  const { setTrashModal } = useTrashModalHelper(workspace);
  const { removeFromFavorite } = useBlockSuiteMetaHelper(workspace);

  const handleRename = useCallback(() => {
    setRenameModalOpen?.();
  }, [setRenameModalOpen]);

  const handleAddLinkedPage = useCallback(() => {
    createLinkedPage(pageId);
    toast(t['com.affine.toastMessage.addLinkedPage']());
  }, [createLinkedPage, pageId, t]);

  const handleRemoveFromFavourites = useCallback(() => {
    removeFromFavorite(pageId);
    toast(t['com.affine.toastMessage.removedFavorites']());
  }, [pageId, removeFromFavorite, t]);

  const handleDelete = useCallback(() => {
    setTrashModal({
      open: true,
      pageIds: [pageId],
      pageTitles: [pageTitle],
    });
  }, [pageId, pageTitle, setTrashModal]);

  const handleRemoveFromAllowList = useCallback(() => {
    removeFromAllowList?.(pageId);
  }, [pageId, removeFromAllowList]);

  return (
    <Menu
      items={
        <OperationItems
          onAddLinkedPage={handleAddLinkedPage}
          onDelete={handleDelete}
          onRemoveFromAllowList={handleRemoveFromAllowList}
          onRemoveFromFavourites={handleRemoveFromFavourites}
          onRename={handleRename}
          inAllowList={inAllowList}
          inFavorites={inFavorites}
          isReferencePage={isReferencePage}
        />
      }
    >
      <IconButton
        size="small"
        type="plain"
        data-testid="left-sidebar-page-operation-button"
        style={{ marginLeft: 4 }}
      >
        <MoreHorizontalIcon />
      </IconButton>
    </Menu>
  );
};
