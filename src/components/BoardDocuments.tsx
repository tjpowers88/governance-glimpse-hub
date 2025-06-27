
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Lock, Unlock, Eye, Upload, Shield } from 'lucide-react';
import { Document } from '../types/boardTypes';

interface BoardDocumentsProps {
  boardId: string;
  boardName: string;
  documents: Document[];
  isMember: boolean;
  onUploadDocument: () => void;
}

const BoardDocuments: React.FC<BoardDocumentsProps> = ({
  boardId,
  boardName,
  documents,
  isMember,
  onUploadDocument
}) => {
  // Filter documents based on membership - only members can see any documents
  const visibleDocuments = isMember ? documents : [];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-4 w-4" />;
  };

  if (!isMember) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Documents - {boardName}</h3>
          <Shield className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <Lock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Members Only Content</p>
          <p>Documents contain confidential information and are only accessible to board members.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Documents - {boardName}</h3>
          <p className="text-sm text-gray-600 mt-1">All documents are confidential and member-only</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={onUploadDocument} size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {visibleDocuments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No documents uploaded yet</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getFileIcon(document.fileType)}
                    <div>
                      <div className="font-medium">{document.title}</div>
                      <div className="text-sm text-gray-500">{document.fileName}</div>
                      {document.description && (
                        <div className="text-xs text-gray-400 mt-1">{document.description}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {document.fileType.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatFileSize(document.fileSize)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {document.uploadedBy}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {new Date(document.uploadedDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default BoardDocuments;
